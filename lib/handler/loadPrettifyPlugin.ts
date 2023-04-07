import { prettierConfig, prettierIgnore } from '@template/prettier'
import { ConfigLoader, findConfigFile } from '@utils/configloader'
import { cSuccess,cWarning,cPrimary } from '@utils/chalk'
import { writeFileTree } from '@utils/writeFileTree'
import { eslintIgnore } from '@template/eslint'
import { commandSpawn } from '@utils/terminal'
import { resolvePkg } from '@utils/pkg'
import { existsDir } from '@utils/file'

import loading from '../utils/loading'

const command = process.platform == 'win32' ? 'npm.cmd' : 'npm'

const waiteWritefile = {
  '.prettierrc': prettierConfig,
  '.prettierignore': prettierIgnore,
  '.eslintignore': eslintIgnore
}

const eslintConfigfile = {
  js: ['.eslintrc.js'],
  json: ['.eslintrc', '.eslintrc.json'],
  yaml: ['.eslintrc.yaml', '.eslintrc.yml']
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
    // 基础依赖安装
    loading.start({text:'Main dependence installing...'})
    await commandSpawn(command,[
      'install',
      'prettier',
      'eslint',
      'eslint-config-prettier',
      'eslint-plugin-prettier',
      '-D'
    ],{cwd})
    loading.succeed('Main dependence install done!')
    // 初始化eslint配置文件
    await commandSpawn(command,['init', '@eslint/config'],{cwd, stdio:'inherit'})
    // 修改eslint配置文件
    const esconfigfilename = await findConfigFile(eslintConfigfile)
    const cfgloader = new ConfigLoader(esconfigfilename)
    const esconfig = await cfgloader.load()
    const esconfigCopy = JSON.parse(JSON.stringify(esconfig))
    esconfigCopy.extends = [
      ...esconfigCopy.extends,
      'plugin:prettier/recommended',
      'eslint-config-prettier'
    ]
    esconfigCopy.plugins = [
      ...esconfigCopy.plugins,
      'prettier'
    ]
    esconfigCopy.globals = {
      defineProps: 'readonly',
      defineEmits: 'readonly',
      defineExpose: 'readonly',
      withDefaults: 'readonly'
    }
    esconfigCopy.rules = {
      'vue/multi-word-component-names': 'off', // extends中继承过来的属性，可以重新修改
      '@typescript-eslint/ban-types': [
        'error',
        {
          extendDefaults: true,
          types: {
            '{}': false
          }
        }
      ],
      '@typescript-eslint/no-explicit-any': ['off'],
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/ban-ts-ignore': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off'
    }
    await cfgloader.write(esconfigCopy)
    // 添加相关的配置文件
    Object.keys(waiteWritefile).forEach(async key=>{
      await writeFileTree(
        cwd,
        {
          [key]: typeof(waiteWritefile[key]) == 'string' 
          ? waiteWritefile[key] 
          : JSON.stringify(waiteWritefile[key], null, 2)
        },
        [key]
      )
    })
    // 添加执行脚本
    const pkg = await resolvePkg(cwd)
    const pkgCopy = JSON.parse(JSON.stringify(pkg))
    pkgCopy.scripts['lint:prettier'] = 'prettier --write .'
    pkgCopy.scripts['lint:eslint'] = 'eslint --fix'
    await writeFileTree(cwd,{'package.json': JSON.stringify(pkgCopy, null, 2)})
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
