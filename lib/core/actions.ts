import { loadPrettifyPlugin } from '@handler/loadPrettifyPlugin'
import { loadRemotePreset } from '@handler/loadRemotePreset'
import { existsDir, removeDir } from '@utils/file'
import { cError, cWarning } from '@utils/chalk'
import { readYanrc } from '@utils/yanrc'
import { operateRepo } from '@handler/handlerRepo'
import inquirer from 'inquirer';


interface Options{
  [index:string]: boolean
}

// create指令
export const handlerCreateProject = async(project:string, options:Options) => {
  const { repo_config } = await readYanrc()
  const repoConfig = JSON.parse(repo_config)
  const choices = Object.keys(repoConfig).map(item=>{
    return {
      name: item,
      value: repoConfig[item]
    }
  })
  const { template } = await inquirer.prompt({
    type: 'list',
    name: 'template',
    message: `Please select the template required for the ${project} project`,
    choices
  })
  let type
  for (let key in repoConfig) {
    if (repoConfig[key] === template) {
      type = key
    }
  }
  const isExistsDir = await existsDir(project)
  if(isExistsDir){
    if(options.force){
      await removeDir(project)
      loadRemotePreset(project,type)
    }else{
      console.log(cError(`Folder '${project}' already exists!`))
    }
  }else{
    loadRemotePreset(project,type)
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
export const handlerOperateRepo = async(options:Options)=>{
  await operateRepo(options)
}