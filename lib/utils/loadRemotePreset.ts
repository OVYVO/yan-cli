const { promisify } = require('util')
const download = promisify(require('download-git-repo'))

import { commandSpawn } from './terminal'
import { vueRepo } from '../config/repo-config'
import loading from './loading'
import { cSuccess, cPrimary } from './chalk'

const command = process.platform == 'win32' ? 'npm.cmd' : 'npm'
const vueRepoMap = {
  1: vueRepo
}

export const loadRemotePreset = async (project:string, type: number)=>{
  try {
    if(type == 2 || type == 3) return console.log(cSuccess('模板正在准备中,请选择其他模板...'))
    console.log(cSuccess('Automatically creating project...'))
    loading.start({text:'File Creating...'})
    await download(vueRepoMap[type], project, {clone: true})
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