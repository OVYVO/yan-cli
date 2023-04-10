import fs from 'fs';
import yaml from 'js-yaml';
import { existsDir } from './file'
import { Option } from 'commander';
const path = require('path')

interface Config {
  [key: string]: any;
}

export class ConfigLoader {
  private config: Config = {};

  constructor(private readonly filePath: string) {}

  async load(): Promise<Config> {
    const extname = this.getExtName();
    switch (extname) {
      case '.js':
        await this.loadJsConfig();
        break;
      case '.json':
        await this.loadJsonConfig();
        break;
      case '.yaml':
      case '.yml':
        await this.loadYamlConfig();
        break;
      default:
        throw new Error(`Unsupported file extension: ${extname}`);
    }
    return this.config;
  }

  async write(newConfig: Config): Promise<void> {
    const extname = this.getExtName();
    switch (extname) {
      case '.js':
        await this.writeJsConfig(newConfig);
        break;
      case '.json':
        await this.writeJsonConfig(newConfig);
        break;
      case '.yaml':
      case '.yml':
        await this.writeYamlConfig(newConfig);
        break;
      default:
      throw new Error(`Unsupported file extension: ${extname}`);
    }
    this.config = newConfig;
  }

  private getExtName(): string {
    return this.filePath.substring(this.filePath.lastIndexOf('.'));
  }

  private async loadJsConfig(): Promise<void> {
    delete require.cache[require.resolve(this.filePath)];
    const loadedModule = require(this.filePath);
    this.config = loadedModule.default || loadedModule;
  }

  private async loadJsonConfig(): Promise<void> {
    const content = await fs.promises.readFile(this.filePath, { encoding: 'utf8' });
    this.config = JSON.parse(content);
  }

  private async loadYamlConfig(): Promise<void> {
    const content = await fs.promises.readFile(this.filePath, { encoding: 'utf8' });
    this.config = yaml.load(content) as Option;
  }

  private async writeJsConfig(newConfig: Config): Promise<void> {
    const content = `module.exports = ${JSON.stringify(newConfig, null, 2)};\n`;
    await fs.promises.writeFile(this.filePath, content, { encoding: 'utf8' });
  }

  private async writeJsonConfig(newConfig: Config): Promise<void> {
    const content = JSON.stringify(newConfig, null, 2);
    await fs.promises.writeFile(this.filePath, content, { encoding: 'utf8' });
  }

  private async writeYamlConfig(newConfig: Config): Promise<void> {
    const content = yaml.dump(newConfig);
    await fs.promises.writeFile(this.filePath, content, { encoding: 'utf8' });
  }
}

export const findConfigFile = async(files:{[index:string]: string[]}) =>{
  for (const type of Object.keys(files)) {
    const descriptors = files[type]
    for (const filename of descriptors) {
      const isExist = await existsDir(filename)
      if(isExist){
        return filename
      }
    }
  }
  return 'No configuration file exists!'
}
