const program = require('commander')
import { 
  handlerCreateProject,
  handlerPrettifyProject,
  handlerOperateRepo 
} from './actions'

export const createCommands = () => {
  program
    .command('repo')
    .description('Provide methods for performing repo operations')
    .option('-c, --config', 'Show config info')
    .option('-o, --overwrite <args...>', 'Force overwrite default config file')
    .option('-a, --add <args...>', 'Add a new repo address to config file')
    .option('-d, --delete <name>', 'Delete a template project address')
    .action(handlerOperateRepo)
  
  program
    .command('create <project>')
    .description('Create a new project from project template. exp: yan create xxx')
    .option('-f, --force', 'Force overwrite of target folder')
    .action(handlerCreateProject)

  program
    .command('prettify')
    .description('Add code prettify tools, Eslint Prettier. exp: yan prettify')
    .action(handlerPrettifyProject)
}
