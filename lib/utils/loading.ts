import loading from "loading-cli"
import type { Options, Loading } from "loading-cli"

class load {
  load: null | Loading

  constructor(){
    this.load = null
  }

  start(options: Options | string ){
    if(this.load) this.load = null
    this.load = loading(options = {
      ...options as Options,
      frames:["🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚"]
    }).start()
  }
  stop(){
    this.load && this.load.stop()
  }
  clear(){
    this.load && this.load.clear()
  }
  warn(text?:string){
    this.load && this.load.warn(text)
  }
  info(text?:string){
    this.load && this.load.info(text)
  }
  succeed(text?:string){
    this.load && this.load.succeed(text)
  }
  fail(text?:string){
    this.load && this.load.fail(text)
  }
}

export default new load()