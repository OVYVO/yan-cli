#! /usr/bin/env node

const program = require('commander')
import Commands from './core'

Object.keys(Commands).forEach(command=>{
  const current = program.command(command)
  if(Commands[command].option && Commands[command].option.length){
    Commands[command].option.forEach(item=>{
      current.option(item.cmd,item.msg || '')
    })  
  }
  current.action(Commands[command].action)
})
  
program.parse(process.argv);