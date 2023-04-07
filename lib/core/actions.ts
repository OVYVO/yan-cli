import { cError, cWarning } from '@utils/chalk'
import { existsDir, removeDir } from '@utils/file'
import { loadRemotePreset } from '@handler/loadRemotePreset'
import { loadPrettifyPlugin } from '@handler/loadPrettifyPlugin'
import { initRepo } from '@handler/initRepo'

import inquirer from 'inquirer';

interface Options{
  [index:string]: boolean
}

// create指令
export const handlerCreateProject = async(project:string, options:Options) => {
  const { template } = await inquirer.prompt({
    type: 'list',
    name: 'template',
    message: `请选择${project}项目需要的模板`,
    choices:[{
      name: '后台模板',
      value: 1
    },{
      name: 'H5模板',
      value: 2
    },{
      name: '普通模板',
      value: 3
    }]
  })
  const isExistsDir = await existsDir(project)
  if(isExistsDir){
    if(options.force){
      await removeDir(project)
      loadRemotePreset(project,template)
    }else{
      console.log(cError(`Folder '${project}' already exists!`))
    }
  }else{
    loadRemotePreset(project,template)
  }
}
// prettify指令
export const handlerPrettifyProject = async() => {
  const { flag } = await inquirer.prompt({
    type: 'confirm',
    name: 'flag',
    message: `${cWarning('If you have already configured eslint/prettier, please use this command with caution. This command will overwrite your configuration. Are you sure you want to continue?')}`,
  })
  if(flag){
    await loadPrettifyPlugin()
  }
}
// repo指令
export const handlerInitRepo = async()=>{
  await initRepo()
}