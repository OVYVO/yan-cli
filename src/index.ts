#! /usr/bin/env node


import { Command } from 'commander'
import Pack from '../package.json'
import inquirer from 'inquirer'

const program = new Command()

program
  .name(Pack.name)
  .version(Pack.version)
  .helpOption('-h, --help')
  .usage(`<command> [option]`)
  .command('choose')
  .action(()=>{
    inquirer.prompt([{
      type: 'checkbox',
      message: '测试一下',
      name: 'checkoutboxcommand',
      choices:[
        new inquirer.Separator('===The Meats==='),
        {
          name: '选择1'
        },
        {
          name: '选择2'
        }
      ],
      validate(answer){
        if(answer.length < 1){
          console.log('请至少选择一项')
        }
      }
    }]).then(answer=>{
      console.log(answer)
    })
  })

program.parse();