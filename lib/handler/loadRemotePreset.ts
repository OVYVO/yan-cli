const { promisify } = require('util')
const download = promisify(require('download-git-repo'))

import { cSuccess, cPrimary, cError } from '@utils/chalk'
import { commandSpawn } from '@utils/terminal'
import { readYanrc } from '@utils/yanrc'
import loading from '@utils/loading'

const command = process.platform == 'win32' ? 'npm.cmd' : 'npm'

export const loadRemotePreset = async (project:string, type: string)=>{
  try {
    console.log(cPrimary('Please wait a moment, the system is automatically creating a project for you...'))
    const { repo_config } = await readYanrc()
    const repoConfig = JSON.parse(repo_config)
    loading.start({text:'File Creating...'})
    await download(repoConfig[type], project, {clone: true})
    loading.succeed('File create done!')
    loading.start({text:'Dependent installing...'})
    await commandSpawn(command,['install', '--registry=https://registry.npm.taobao.org'],{cwd: `./${project}`, stdio:'pipe'})
    loading.succeed('Dependent install done!')
    console.log(cSuccess('✨✨✨ Cerate project well done! ✨✨✨'))
    console.log('')
    console.log('===========start project===========')
    console.log(cPrimary(`cd ${project}`))
    console.log(cPrimary('npm run dev'))
    console.log('===================================')
  } catch (error) {
    loading.fail(`Sorry, Cerate project failed. errorMessage: ${error}`)
  }
}