const { promisify } = require('util')
const download = promisify(require('download-git-repo'))

import loading from '@utils/loading'
import { commandSpawn } from '@utils/terminal'
import { vuePepo } from '@config/repo-config'
import { cSuccess, cPrimary } from '@utils/chalk'

const command = process.platform == 'win32' ? 'npm.cmd' : 'npm' 

// create指令
export const handlerCreateProject = async(project:string, others?:string[]) => {
  try {
    console.log(cSuccess('Automatically creating project...'))
    loading.start({text:'File Creating...'})
    await download(vuePepo, project, {clone: true})
    loading.succeed('File create done!')
    loading.start({text:'Dependent installing...'})
    await commandSpawn(command,['install'],{cwd: `./${project}`})
    loading.succeed('Dependent install done!')
    console.log(cSuccess('✨✨✨ Cerate project well done! ✨✨✨'))
    console.log('')
    console.log('===========start project===========')
    console.log(cPrimary(`cd ${project}`))
    console.log(cPrimary('npm run dev'))
    console.log('========================')
  } catch (error) {
    loading.fail(`Sorry, Cerate project failed. errorMessage: ${error}`)
  }
}
