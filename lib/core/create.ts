const program = require('commander')
import { 
  handlerCreateProject,
  handlerPrettifyProject,
  handlerInitRepo 
} from './actions'

export const createCommands = () => {
  program
    .command('create <project>')
    .description('Create a new project from project template. exp: yan create xxx')
    .option('--force', 'Force overwrite of target folder')
    .action(handlerCreateProject)

  program
    .command('prettify')
    .description('Add code prettify tools, Eslint Prettier. exp: yan prettify')
    .action(handlerPrettifyProject)

  program
    .command('initrepo')
    .description('Specify your template project address. exp: yan initrepo direct:https://github.com/xxx/xxx.git#main')
    .action(handlerInitRepo)
}
