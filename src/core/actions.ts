const { promisify } = require('util')
const download = promisify(require('download-git-repo'))

const handlerCreateProject = async(project:string, others:string[]) => {
  // clone项目
  // 执行 npm install
  // 执行 npm run serve
  // 打开浏览器 
  console.log('=========')
  console.log(project)
  console.log(others)
  console.log('=========')
  await download()
}

export {
  handlerCreateProject
}