#! /usr/bin/env node


import { Command } from 'commander'
import Pack from '../package.json'
// import inquirer from 'inquirer'
import { loading } from '@utils'

const program = new Command()

program
  .name(Pack.name)
  .version(Pack.version)
  .helpOption('-h, --help')
  .usage(`<command> [option]`)
  // .command('choose')
  // .action(()=>{
  //   inquirer.prompt([{
  //     type: 'list',
  //     message: '测试一下',
  //     name: 'listcheck',
  //     choices:[
  //       new inquirer.Separator('===The Meats==='),
  //       {
  //         name: '选择1',
  //         value: 1
  //       },
  //       {
  //         name: '选择2',
  //         value: 2
  //       }
  //     ],
  //     validate(answer){
  //       if(answer.length < 1){
  //         console.log('请至少选择一项')
  //       }
  //     }
  //   }]).then(answer=>{
  //     console.log(answer)
  //   })
  // })
  .command('loading')
  .action(()=>{
    loading.start({
      color: 'red',
      text: '测试loading'
    })
    setTimeout(()=>{
      loading.warn('警告')
      setTimeout(()=>{
        loading.info('提示')
        setTimeout(()=>{
          loading.stop()
        },2000)
      },2000)
    },2000)
  })

program.parse();