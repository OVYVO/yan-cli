#! /usr/bin/env node


import { Command } from 'commander'
import Pack from '../package.json'

import Commands from '@commands'

const program = new Command()

program
  .name(Pack.name)
  .version(Pack.version)
  .helpOption('-h, --help')
  .usage(`<command> [option]`)

Object.keys(Commands).forEach(command=>{
  const current = program.command(command)
  if(Commands[command].option && Commands[command].option.length){
    Commands[command].option.forEach(item=>{
      current.option(item.cmd,item.msg || '')
    })  
  }
  current.action(Commands[command].action)
})
  
program.parse();