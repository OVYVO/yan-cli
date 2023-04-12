const os = require('os')
const path = require('path')
import { writeFileTree } from './writeFileTree'
import { readFile, existsDir } from './file'

interface YanrcConfig {
  [key: string]: string;
}

const platform = os.platform()
const cwd = platform == 'win32' ? path.resolve(process.env.HOME) : path.resolve(os.homedir())

export const writeYanrc = async(config: YanrcConfig) =>{
  const lines = Object.entries(config)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");
    await writeFileTree(cwd,{'.yanrc': lines})
}

export const readYanrc = async ():Promise<YanrcConfig> => {
  const isExists = await existsDir(path.resolve(cwd,'.yanrc'))
  if(isExists){
    const config: YanrcConfig = {};
    const fileContents = await readFile(path.resolve(cwd,'.yanrc'))
    const lines = fileContents.split(/\r?\n/);
    for (const line of lines) {
      if (line.trim() === "") {
        continue;
      }
      const [key, value] = line.split("=").map((part) => part.trim());
      config[key] = value;
    }
    return config;
  }else{
    await writeYanrc({
      repo_config: JSON.stringify({
        "admin_client_template": "direct:https://github.com/OVYVO/vite-vue3-ts-template.git#main",
        "h5_client_template": "direct:https://github.com/OVYVO/h5_client_template.git#main"
      })
    })
    return readYanrc()
  }
}