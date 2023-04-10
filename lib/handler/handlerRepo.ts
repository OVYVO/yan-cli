import { removeDir } from '@utils/file'
import { commandSpawn } from '@utils/terminal'
import { cSuccess,cPrimary,cError } from '@utils/chalk'
import { writeFileTree } from '@utils/writeFileTree'
import loading from '../utils/loading'
import { repoMap } from '@config/repo-config'
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
    const originConfigPath = path.resolve(nodeOriginPath,'node_modules/yan-cli/lib/config')
    const originBinPath = path.resolve(nodeOriginPath,'node_modules/yan-cli/bin')
    if(options?.overwrite){
      let repoconfig = `export const repoMap = ${JSON.stringify({[options.overwrite[0]]:options.overwrite[1]})}`
      await writeFileTree(originConfigPath,{'repo-config.ts': repoconfig})
      console.log(cSuccess('Overwrite config success!'))
    }else if(options?.add){
      let repoconfigCopy = JSON.parse(JSON.stringify(repoMap))
      repoconfigCopy = {...repoconfigCopy, [options.add[0]]:options.add[1]} 
      let repoconfig = `export const repoMap = ${JSON.stringify(repoconfigCopy,null,2)}` 
      await writeFileTree(originConfigPath,{'repo-config.ts': repoconfig})
      console.log(cSuccess('Add config success!'))
    }else if(options?.delete){
      let repoconfigCopy = JSON.parse(JSON.stringify(repoMap))
      const key = options.delete
      if(Reflect.has(repoconfigCopy,key)){
        if(Reflect.deleteProperty(repoconfigCopy,key)){
          let repoconfig = `export const repoMap = ${JSON.stringify(repoconfigCopy,null,2)}` 
          await writeFileTree(originConfigPath,{'repo-config.ts': repoconfig})
          console.log(cSuccess('Delete config success!'))
        }else{
          return console.log(cError('Delete failed'))
        }
      }else{
        return console.log(cError(`The attribute "${key}" does not exist, please confirm the config information`))
      }
    }else{
      console.log(cPrimary('=============repo-config==========='))
      console.log(repoMap)
      console.log(cPrimary('==================================='))
    }
    if(options?.delete || options?.overwrite || options?.add){
      await removeDir(originBinPath)
      loading.start({text:'Scaffold configuration changing...'})
      await commandSpawn('npx.cmd', ['tsc', '&&', 'tsc-alias'],{cwd: path.resolve(nodeOriginPath,'node_modules/yan-cli')})
      //await commandSpawn(command, ['link', '--force'],{cwd: path.resolve(nodeOriginPath,'node_modules/yan-cli')})
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