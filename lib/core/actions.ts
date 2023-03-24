import { cError } from '@utils/chalk'
import { existsDir, removeDir } from '@utils/file'
import { loadRemotePreset } from '@utils/loadRemotePreset'

interface Options{
  [index:string]: boolean
}

// create指令
export const handlerCreateProject = async(project:string, options:Options) => {
  const isExistsDir = await existsDir(project)
  if(isExistsDir){
    if(options.force){
      await removeDir(project)
      loadRemotePreset(project)
    }else{
      console.log(cError(`Folder '${project}' already exists!`))
    }
  }else{
    loadRemotePreset(project)
  }
}
