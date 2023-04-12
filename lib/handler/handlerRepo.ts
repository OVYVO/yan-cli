import { cSuccess,cPrimary,cError } from '@utils/chalk'
import { writeYanrc, readYanrc } from '@utils/yanrc'
import loading from '../utils/loading'

export const operateRepo = async(options)=>{
  try {
    const { repo_config } = await readYanrc()
    const repoConfig = JSON.parse(repo_config)
    if(options?.overwrite){
      await writeYanrc({repo_config: JSON.stringify({
        [options.overwrite[0]] : options.overwrite[1]
      })})
      console.log(cSuccess('✨✨✨Overwrite config success!✨✨✨'))
    }else if(options?.add){
      await writeYanrc({repo_config: JSON.stringify({
        ...repoConfig,
        [options.add[0]] : options.add[1]
      })})
      console.log(cSuccess(`✨✨✨Add config '${options.add[0]}' success!✨✨✨`))
    }else if(options?.delete){
      const repoconfigCopy = JSON.parse(JSON.stringify(repoConfig))
      const key = options.delete
      if(Reflect.has(repoconfigCopy,key)){
        if(Reflect.deleteProperty(repoconfigCopy,key)){
          await writeYanrc({repo_config: JSON.stringify(repoconfigCopy)})
          console.log(cSuccess(`✨✨✨Delete config '${key}' success!✨✨✨`))
        }else{
          return console.log(cError('Delete failed'))
        }
      }else{
        return console.log(cError(`The attribute "${key}" does not exist, please confirm the config information`))
      }
    }else{
      console.log(cPrimary('=============repo-config==========='))
      console.log(repoConfig)
      console.log(cPrimary('==================================='))
    }
    if(options?.delete || options?.overwrite || options?.add){
      console.log('')
      console.log('===========use command=============')
      console.log(cPrimary('yan create <project>'))
      console.log('===================================')
    }
  } catch (error) {
    loading.fail(cError(`Sorry, initrepo failed. errorMessage: ${error}`))
  }
}