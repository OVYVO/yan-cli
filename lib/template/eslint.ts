export const eslintConfig = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended', // eslint核心规则
    'plugin:vue/vue3-essential', // 继承eslint-plugin-vue组件中的基础配置
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // 继承eslint-plugin-prettier组件中的基础配置
    'eslint-config-prettier' // 处理配置兼容问题
  ],
  parser: 'vue-eslint-parser', // 使用vue解析器
  parserOptions: {
    // 设置支持的JavaScript语言选项
    ecmaVersion: 'latest', // 指定EcmaScript的版本
    sourceType: 'module', // script/module
    parser: '@typescript-eslint/parser',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    'vue', // eslint-plugin-vue缩写
    '@typescript-eslint',
    'prettier' // eslint-plugin-prettier缩写
  ],
  globals: {
    // 添加全局变量，防止no-undef 规则发出警告
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  },
  rules: {
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
}


export const eslintIgnore = `*.sh
  *.md
  *.woff
  *.ttf
  .vscode
  .husky
  .github
`