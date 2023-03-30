import ora from 'ora'
import type { Options, Ora } from 'ora'

import { cPrimary, cError, cWarning, cSuccess } from '@utils/chalk'

class load {
  load: null | Ora

  constructor(){
    this.load = null
  }

  start(options: Options | string ){
    if(this.load) this.load = null
    this.load = ora(options = {
      ...options as Options,
      spinner: 'dots'
    }).start()
  }
  stop(){
    this.load && this.load.stop()
  }
  clear(){
    this.load && this.load.clear()
  }
  warn(text?:string){
    this.load && this.load.warn(cWarning(text as string))
  }
  info(text?:string){
    this.load && this.load.info(cPrimary(text as string))
  }
  succeed(text?:string){
    this.load && this.load.succeed(cSuccess(text as string))
  }
  fail(text?:string){
    this.load && this.load.fail(cError(text as string))
  }
}

export default new load()