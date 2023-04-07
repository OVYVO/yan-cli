const { promisify } = require('util')
const download = promisify(require('download-git-repo'))

import { admin_client_template, h5_client_template } from '@config/repo-config'
import { cSuccess, cPrimary, cError } from '@utils/chalk'
import { commandSpawn } from '@utils/terminal'
import loading from '@utils/loading'

const command = process.platform == 'win32' ? 'npm.cmd' : 'npm'
const vueRepoMap = {
  1: admin_client_template,
  2: h5_client_template
}

export const loadRemotePreset = async (project:string, type: number)=>{
  try {
    if(type == 3) return console.log(cError('模板正在准备中,请选择其他模板...'))
    console.log(cPrimary('Please wait a moment, the system is automatically creating a project for you...'))
    loading.start({text:'File Creating...'})
    await download(vueRepoMap[type], project, {clone: true})
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