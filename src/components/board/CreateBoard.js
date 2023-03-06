import React from 'react'
import { Grid, Box, Tooltip, IconButton } from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint'

const CreateBoard = ({ handleOpenModel }) => {
  return (
    <Grid item sx={{ minWidth: 150 }}>
      <Box className='flex'>
        <Tooltip title='Create New skill'>
          <IconButton
            aria-label='create board'
            color='inherit'
            onClick={handleOpenModel}>
            <ControlPointIcon />
          </IconButton>
        </Tooltip>
        Create skill
      </Box>
    </Grid>
  )
}

export default CreateBoard
