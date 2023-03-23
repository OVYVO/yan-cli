const program = require('commander')
import { handlerCreateProject } from './actions'

export const createCommands = () => {
  program
    .command('create <project> [others...]')
    .description('create a new project')
    .action(handlerCreateProject)
}
