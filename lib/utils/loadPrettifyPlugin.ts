import { prettierConfig, prettierIgnore} from '@template/prettier'
import { eslintConfig, eslintIgnore} from '@template/eslint'
import { cSuccess,cWarning,cPrimary } from '@utils/chalk'
import { writeFileTree } from '@/utils/writeFileTree'
import { commandSpawn } from '@utils/terminal'
import { resolvePkg } from '@utils/pkg'
import { existsDir} from '@utils/file'

import loading from './loading'

const command = process.platform == 'win32' ? 'npm.cmd' : 'npm'

const waiteWritefile = {
  '.prettierrc': prettierConfig,
  '.prettierignore': prettierIgnore,
  '.eslintrc.cjs': eslintConfig,
  '.eslintignore': eslintIgnore
}

export const loadPrettifyPlugin = async()=>{
  try {
    // 环境判断
    const isExistsPkg = await existsDir('package.json')
    const cwd = process.cwd()
    if(!isExistsPkg) {
      console.log()
      console.log('=========== Warning ===========')
      console.log(cWarning('Please run create command before using this command!'))
      console.log('===============================')
      return 
    } 
    console.log(cSuccess('Please wait a moment, relevant plugins for prettify installing...'))
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
      await writeFileTree(cwd,
        {[key]: typeof(waiteWritefile[key]) == 'string' ? waiteWritefile[key] : JSON.stringify(waiteWritefile[key], null, 2)},
        [key]
      )
    })
    // 添加执行脚本
    const pkg = await resolvePkg(cwd)
    const pkgCopy = JSON.parse(JSON.stringify(pkg))
    pkgCopy.scripts['lint:prettier'] = 'prettier --write .'
    pkgCopy.scripts['lint:eslint'] = 'eslint --fix'
    await writeFileTree(cwd,
      {'package.json': JSON.stringify(pkgCopy, null, 2)}
    )
    console.log(cSuccess('✨✨✨ Job well done! ✨✨✨'))
    console.log('')
    console.log('===========use command===========')
    console.log(cPrimary('npm run lint:prettier'))
    console.log(cPrimary('npm run lint:eslint'))
    console.log('===================================')
  } catch (error) {
    loading.fail(`Sorry, plugin add failed. errorMessage: ${error}`)
  }
}