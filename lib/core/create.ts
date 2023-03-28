const program = require('commander')
import { handlerCreateProject,handlerPrettifyProject } from './actions'

export const createCommands = () => {
  program
    .command('create <project>')
    .description('Create a new project from project template')
    .option('--force', 'Force overwrite of target folder')
    .action(handlerCreateProject)

  program
    .command('prettify')
    .description('Add code prettify tools, Eslint Prettier')
    .action(handlerPrettifyProject)
}
