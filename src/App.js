import * as React from 'react';
import lightTheme from './theme/light-theme';
import darkTheme from './theme/dark-theme';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './containers/Login';
import Projects from './containers/Projects';
import ProjectDashboard from './containers/ProjectDashboard';
import Layout from './containers/Layout';
import Box from '@mui/material/Box';






const App = () => {
  // handle dark mode
  const [mode, setMode] = React.useState(true);
  const appliedTheme = createTheme(mode ? lightTheme : darkTheme);

  const toggleTheme = () => {
    setMode(!mode);
  };

  // handle projects
  const [projects, setProjects] = React.useState(null);

  React.useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:9292/projects');
      const data = await response.json();
      setProjects(data.projects);
      // console.log('numbver of projects is : ' + projects.length)
    } catch (error) {
      console.error('Data fetching failed with error  :  ' + error);
    }  
  };
  const patchProjects = (updatedProject) => {
    console.log('Updating post id : ' + updatedProject.project.id)
    try {
      fetch(` http://localhost:9292/projects/${updatedProject.project.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          favorite: updatedProject.favorite,
          title: updatedProject.title,
          color: updatedProject.color,
        }),
      })
      console.log('Successfully updated the')
    }
    catch(error) {
       console.log('Operation failed with error : ' + error)
    }
   
  };

  const postProjects = (project) => {
    fetch('http://localhost:9292/projects/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(project),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
      .then((data) => {
        setProjects((prevProjects) => {
          return [...prevProjects, data]
        })
      })
      .catch((error) => {
        console.error('Error posting projects:', error);
      });
  };
``
  const handleDeleteProject = (deleteProject) => {
    const updatedProjects = projects.filter(
      (project) => project.id !== deleteProject
    );

    fetch(`http://localhost:9292/projects/${deleteProject}`, {
      method: 'DELETE',
    });

    setProjects(updatedProjects);
  };

  const handleUpdatingProject = (changedProject) => {
    patchProjects(changedProject);

    const updatedProjects = projects.map((project) =>
      project.id === changedProject.id ? changedProject : project
    );
    setProjects(updatedProjects);
  };

  //handle search
  const [search, setSearch] = React.useState('');
  
  // filter the projects only when the search term is not empty
  const filteredProjects = search && projects
  ? projects.filter((project) =>
      project.title.toLowerCase().includes(search.toLowerCase())
    )
  : [];

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

if (projects === null) {
  return (
    <div>
      Loading...
    </div>
  )
}


  return (
 <>
   
    <ThemeProvider theme={appliedTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Router>
           
          <Layout
            toggleTheme={toggleTheme}
            mode={mode}
            projects={projects}
            search={search}
            setSearch={setSearch}
            fetchProjects={fetchProjects}>
            <Route
              exact
              path='/'
              render={(routerProps) => <Login {...routerProps} />}
            />
           
            <Route
              exact
              path='/projects'
              render={(routerProps) => (
                <Projects
                  // {...routerProps}
                  projects={projects}
                  mode={mode}
                  patchProjects={patchProjects}
                  postProjects={postProjects}
                  handleUpdatingProject={handleUpdatingProject}
                  handleDeleteProject={handleDeleteProject}
                />
              )}
            />
            <Route
              exact
              path='/projects/:id'
              render={(routerProps) => (
                <ProjectDashboard
                  {...routerProps}
                  mode={mode}
                  handleUpdatingProject={handleUpdatingProject}
                  handleDeleteProject={handleDeleteProject}
                />
              )}
            />
          </Layout>
        </Router>
      </Box>
    </ThemeProvider>

    </>
  )
}
export default App
