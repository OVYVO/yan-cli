import loading from "loading-cli"
import type { Options, Loading } from "loading-cli"

class load {
  load: null | Loading
  
  constructor(){
    this.load = null
  }

  start(options: Options | string ){
    if(!this.load){
      this.load = loading(options).start()
    }else{
      this.load.start(options as string)
    }
  }

  stop(){
    this.load && this.load.stop()
  }

  warn(text:string){
    this.load && this.load.warn(text)
  }

  info(text:string){
    this.load && this.load.info(text)
  }
}

export default new load()