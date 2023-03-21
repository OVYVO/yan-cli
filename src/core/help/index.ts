import Pack from '../../../package.json'
const program = require('commander')

export function helpOptions(){
  program.name(Pack.name)
  program.version(Pack.version)
  program.option('-d, --dest <dest>','destination folder, exp: -d /src/pages')
  program.option('-f, --framework <framework>','project framework, exp: vue')
  program.usage(`<command> [option]`)
}