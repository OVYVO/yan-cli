import fs from 'fs';
import yaml from 'js-yaml';

interface Config {
  [key: string]: any;
}

class ConfigLoader {
  private config: Config = {};

  constructor(private readonly filePath: string) {}

  public async load(): Promise<Config> {
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

  public async write(newConfig: Config): Promise<void> {
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
    this.config = yaml.safeLoad(content);
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
    const content = yaml.safeDump(newConfig);
    await fs.promises.writeFile(this.filePath, content, { encoding: 'utf8' });
  }
}

export default ConfigLoader


//example
// const configFilePath = './config.yaml';

// async function main() {
//   const configLoader = new ConfigLoader(configFilePath);

//   // 加载配置
//   const config = await configLoader.load();
//   console.log(config);

//   // 修改配置
//   config.foo = 'bar';

//   // 写入新配置
//   await configLoader.write(config);
// }

// main().catch((err) => console.error(err));