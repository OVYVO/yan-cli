const { promisify } = require('util')
const download = promisify(require('download-git-repo'))

import loading from '@utils/loading'
import { commandSpawn } from '@utils/terminal'
import { vuePepo } from '@config/repo-config'
import { cSuccess } from '@utils/chalk'

const command = process.platform == 'win32' ? 'npm.cmd' : 'npm' 

// create指令
export const handlerCreateProject = async(project:string, others?:string[]) => {
  try {
    console.log(cSuccess('🚀🚀🚀 Automatically creating a project for you！🚀🚀🚀'))
    loading.start({text:'File Creating...'})
    await download(vuePepo, project)
    loading.succeed('File create done!')
    loading.start({text:'Dependent installing...'})
    await commandSpawn(command,['install'],{cwd: `./${project}`})
    loading.succeed('Dependent install done!')
    console.log(cSuccess('✨✨✨ Cerate project well done！✨✨✨'))
  } catch (error) {
    loading.fail(`Sorry, Cerate project failed. errorMessage: ${error}`)
  }
}
