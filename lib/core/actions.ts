const { promisify } = require('util')
const download = promisify(require('download-git-repo'))

import loading from '@utils/loading'
import { commandSpawn } from '@utils/terminal'
import { vuePepo } from '@config/repo-config'
import { cSuccess } from '@utils/chalk'

const command = process.platform == 'win32' ? 'npm.cmd' : 'npm' 

// create指令
export const handlerCreateProject = async(project:string, others?:string[]) => {
  // 代码克隆
  loading.start({text:"Code warehouse cloning..."})
  try {
    await download(vuePepo, project, {clone: true})
  } catch (error) {
    loading.fail(`Sorry, code warehouse cloning failed. errorMessage: ${error}`)
  }
  loading.succeed('Code warehouse cloned successfully')
  // 依赖安装
  loading.start({text:"Code dependency installation in progress..."})
  try {
    await commandSpawn(command,['install'],{cwd: `./${project}`})
  } catch (error) {
    loading.fail(`Sorry, Dependency installation failed. errorMessage: ${error}`)
  }
  // 打开vscode
  await commandSpawn('code',['.'],{cwd: `./${project}`})
  cSuccess('✨✨✨Cerate project well done！✨✨✨')
}
