import { readDir, mkdir, rmdir, CRed } from '@utils'

export default async function(projectName, cmd){
  // 判断params是否为空
  // 判断文件夹是否存在
  // 若force 为true删除，否则提示错误
  const currentPath = process.cwd() + '\\' +  projectName

  try {
    const exist = readDir(currentPath)
    if(cmd.force){ // 强制覆盖
      exist && await rmdir(currentPath)
      await mkdir(currentPath)
    }else{
      if(!exist){
        return console.log(CRed('Not exist dir'))
      }
    }
  } catch (error) {
    
  }
    await readDir(currentPath)
    await rmdir(currentPath)
    await mkdir(currentPath)
}