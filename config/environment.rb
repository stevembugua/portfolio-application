# require 'bundler/setup'

# Bundler.require

# require_all 'app'

ENV["RACK_ENV"]  ||= "development"

require "bundler/setup"
Bundler.require(:default, ENV["RACK_ENV"])

require_all "app"