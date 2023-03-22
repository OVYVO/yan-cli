#! /usr/bin/env node

const program = require('commander')
import { helpOptions } from './core/help'
import { createCommands } from './core/create'


// 创建辅助指令
helpOptions()
// 添加其他指令
createCommands()

  
program.parse(process.argv);