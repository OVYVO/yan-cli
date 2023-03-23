const { promisify } = require('util')

const download = promisify(require('download-git-repo'))

import { commandSpawn } from '@utils/terminal'

const handlerCreateProject = async(project:string, others:string[]) => {
  // clone项目
  await download('xxxx',project,{clone: true})
  
  // 执行 npm install
  // windows终端运行命令需要注意 npm.cmd => where npm
  const command = process.platform == 'win32' ? 'npm.cmd' : 'npm'
  await commandSpawn(command,['install'],{cwd: `./${project}`})
  
  // 执行 npm run serve
  // 加上await之后并不会执行open代码，因为代码被阻塞
  // await commandSpawn(command,['run', 'serve'],{cwd: `./${project}`})
  commandSpawn(command,['run', 'serve'],{cwd: `./${project}`})
}

export {
  handlerCreateProject
}