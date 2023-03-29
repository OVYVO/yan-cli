import { prettierConfig, prettierIgnore} from '@template/prettier'
import { eslintConfig, eslintIgnore} from '@template/eslint'
import { writeFileTree } from '@/utils/writeFileTree'
import { commandSpawn } from '@utils/terminal'
import { resolvePkg } from '@utils/pkg'
import loading from './loading'
import { cSuccess, cPrimary, cWarning } from './chalk'

const command = process.platform == 'win32' ? 'npm.cmd' : 'npm'

const waiteWritefile = {
  '.prettierrc': prettierConfig,
  '.prettierignore': prettierIgnore,
  '.eslintrc.cjs': eslintConfig,
  '.eslintignore': eslintIgnore
}

export const loadPrettifyPlugin = async()=>{
  // 环境判断
  const { IS_VUE_TEMP_CREATED } = process.env
  if(IS_VUE_TEMP_CREATED !== '1') {
    console.log()
    console.log('=========== Warning ===========')
    console.log(cWarning('Please run create command before using this command!'))
    console.log('===============================')
    return 
  } 
  const cwd = process.cwd()
  // 依赖安装
  loading.start({text:'Dependent installing......'})
  await commandSpawn(command,[
    'install',
    '@babel/eslint-parser',
    '@babel/core',
    'eslint',
    'eslint-config-prettier',
    'eslint-plugin-prettier',
    'eslint-plugin-vue',
    'vue-eslint-parser',
    'prettier',
    '-D'
  ],{cwd})
  loading.succeed('Dependent install done!')
  // 添加相关的配置文件
  Object.keys(waiteWritefile).forEach(async key=>{
    await writeFileTree(
      cwd,
      {[key]: typeof(waiteWritefile[key]) == 'string' ? waiteWritefile[key] : JSON.stringify(waiteWritefile[key], null, 2)},
      [key])
  })
  loading.succeed('Configuration file add done!')
  // 添加执行脚本
  const pkg = await resolvePkg(cwd)
  const pkgCopy = JSON.parse(JSON.stringify(pkg))
  pkgCopy.scripts['lint:prettier'] = 'prettier --write .'
  await writeFileTree(cwd,
    {'package.json': JSON.stringify(pkgCopy, null, 2)}
  )
  loading.succeed('Plugin add success! You can use the [npm run lint:prettier] command or with other plugins to standardize your code')
}