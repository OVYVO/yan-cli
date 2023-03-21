import { readDir, mkdir, rmdir, CRed } from '@utils'

export default async function(projectName, cmd){
  // 判断params是否为空
  // 判断文件夹是否存在
  // 若force 为true删除，否则提示错误
  const currentPath = process.cwd() + '\\' +  projectName

  process.on('unhandledRejection', (reason, p) => {
    console.log('Promise: ', p, 'Reason: ', reason)
  })

  try {
    const exist = await readDir(currentPath)
    if(cmd.force){ // 强制覆盖
      exist && await rmdir(currentPath)
      await mkdir(currentPath)
      //拉取git代码
    }else{
      if(exist){
        return console.log(CRed('Exist dir'))
      }else{
        await mkdir(currentPath)
        //拉取git代码
        // download-git-repo
      }
    }
  } catch (error) {
    console.log(error)
  }
}