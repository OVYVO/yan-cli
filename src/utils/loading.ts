import loading from "loading-cli"
import type { Options, Loading } from "loading-cli"

class load {
  load: null | Loading
  constructor(){
    this.load = null
  }
  /**
   * @param options
   * 开启loading状态 存在load实例则传入字符串
  */
  start(options: Options | string ){
    if(!this.load){
      this.load = loading(options).start()
    }else{
      this.load.start(options as string)
    }
  }
  /**
   * 关闭loading状态
  */
  stop(){
    this.load && this.load.stop()
  }
  /**
   * 报错loading状态
  */
  warn(text: string){
    this.load && this.load.warn(text)
  }
  info(text:string){
    this.load && this.load.info(text)
  }
}

export default new load()