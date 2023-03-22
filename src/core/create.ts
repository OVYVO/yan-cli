const program = require('commander')
import { handlerCreateProject } from './actions'
import { vuePepo } from '@config/repo-config'

console.log(vuePepo)

export const createCommands = () => {
  program
    .command('create <project> [others...]')
    .description('create a new project')
    .action(( project:string, others:string[] ) => {
      handlerCreateProject(project,others)
    })
}
