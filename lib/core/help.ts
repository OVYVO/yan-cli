import { resolvePkg } from '@utils/pkg'
const program = require('commander')

export async function  helpOptions(){
  const pkg = await resolvePkg(process.cwd())
  program.name(pkg.name)
  program.version(pkg.version)
  // program.option('-d, --dest <dest>','destination folder, exp: -d /src/pages')
  // program.option('-f, --framework <framework>','project framework, exp: vue')
  program.usage(`<command> [option]`)
}