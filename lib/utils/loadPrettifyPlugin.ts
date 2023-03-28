import { prettierConfig, prettierIgnore} from '@template/prettier'
import { eslintConfig, eslintIgnore} from '@template/eslint'
import { writeFileTree } from '@/utils/writeFileTree'
import { commandSpawn } from '@utils/terminal'
import loading from './loading'
import { cSuccess, cPrimary } from './chalk'

const command = process.platform == 'win32' ? 'npm.cmd' : 'npm'

const waiteWritefile = {
  '.prettierrc': prettierConfig,
  '.prettierignore': prettierIgnore,
  '.eslintrc.cjs': eslintConfig,
  '.eslintignore': eslintIgnore
}

export const loadPrettifyPlugin = async()=>{
  const curreent = process.cwd()
  // await commandSpawn(command,[
  //   'install',
  //   'eslint',
  //   'eslint-config-prettier',
  //   'eslint-plugin-prettier',
  //   'eslint-plugin-vue',
  //   'prettier'
  // ],{cwd: curreent})
  Object.keys(waiteWritefile).forEach(async key=>{
    await writeFileTree(
      curreent,
      {[key]: typeof(waiteWritefile[key]) == 'string' ? waiteWritefile[key] : JSON.stringify(waiteWritefile[key], null, 2)},
      [key])
  })
}