import { prettierConfig, prettierIgnore} from '@template/prettier'
import { eslintConfig, eslintIgnore} from '@template/eslint'
import { writeFileTree } from '@/utils/writeFileTree'
import { commandSpawn } from '@utils/terminal'
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
  const { IS_VUE_TEMP_CREATED } = process.env
  if(IS_VUE_TEMP_CREATED !== '1') {
    console.log()
    console.log('=========== Warning ===========')
    console.log(cWarning('Please run create command before using this command!'))
    console.log('===============================')
    return 
  } 
  const curreent = process.cwd()
  loading.start({text:'Dependent installing......'})
  await commandSpawn(command,[
    'install',
    'eslint',
    'eslint-config-prettier',
    'eslint-plugin-prettier',
    'eslint-plugin-vue',
    'prettier'
  ],{cwd: curreent})
  loading.succeed('Dependent install done!')
  Object.keys(waiteWritefile).forEach(async key=>{
    await writeFileTree(
      curreent,
      {[key]: typeof(waiteWritefile[key]) == 'string' ? waiteWritefile[key] : JSON.stringify(waiteWritefile[key], null, 2)},
      [key])
  })
  loading.succeed('Plugin add success!')
}