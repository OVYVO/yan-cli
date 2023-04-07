import { ConfigLoader } from '@utils/configloader'
import { commandSpawn } from '@utils/terminal'
import { cSuccess,cPrimary,cError } from '@utils/chalk'
import loading from '../utils/loading'
const path = require('path')

const command = process.platform == 'win32' ? 'npm.cmd' : 'npm'

const getExePath = (exeName: string)=>{
  let strPath = process.env['PATH'] as String
  let nodePath  = strPath.split(';').filter((str) => {
    return str.toLowerCase().indexOf(exeName.toLowerCase()) > 0 
  }) || []
  return nodePath[0]
}

export const operateRepo = async(options)=>{
  try {
    const nodeOriginPath = getExePath('nodejs')
    const originConfigPath = path.resolve(nodeOriginPath,'node_modules/yan-cli/lib/config/repo-config.js')
    const loader = new ConfigLoader(originConfigPath)
    const repoconfig = await loader.load()
    if(options?.overwrite){
      let repoconfig = {[options.overwrite[0]]:options.overwrite[1]}
      await loader.write(repoconfig)
      console.log(cSuccess('Overwrite config success!'))
    }else if(options?.add){
      let repoconfigCopy = JSON.parse(JSON.stringify(repoconfig))
      repoconfigCopy = {...repoconfigCopy, [options.add[0]]:options.add[1]} 
      await loader.write(repoconfigCopy)
      console.log(cSuccess('Add config success!'))
    }else if(options?.delete){
      let repoconfigCopy = JSON.parse(JSON.stringify(repoconfig))
      const key = options.delete
      if(Reflect.has(repoconfigCopy,key)){
        if(Reflect.deleteProperty(repoconfigCopy,key)){
          await loader.write(repoconfigCopy)
          console.log(cSuccess('Delete config success!'))
        }else{
          return console.log(cError('Delete failed'))
        }
      }else{
        return console.log(cError(`The attribute "${key}" does not exist, please confirm the config information`))
      }
    }else{
      console.log(cPrimary('=============repo-config==========='))
      console.log(repoconfig)
      console.log(cPrimary('==================================='))
    }
    if(options?.delete || options?.overwrite || options?.add){
      loading.start({text:'Scaffold configuration changing...'})
      await commandSpawn(command, ['run', 'build'],{cwd: path.resolve(nodeOriginPath,'node_modules/yan-cli')})
      await commandSpawn(command, ['link', '--force'],{cwd: path.resolve(nodeOriginPath,'node_modules/yan-cli')})
      loading.succeed(cSuccess('✨✨✨ Job well done! ✨✨✨'))
      console.log('')
      console.log('===========use command=============')
      console.log(cPrimary('yan create <project>'))
      console.log('===================================')
    }
  } catch (error) {
    loading.fail(`Sorry, initrepo failed. errorMessage: ${error}`)
  }
}