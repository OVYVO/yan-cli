import { readFileSync } from 'fs'
import fse from 'fs-extra'
import { cError, cSuccess } from './chalk'

export const existsDir = async (path: string): Promise<boolean> => {
  try {
    const exists = await fse.pathExists(path);
    return exists;
  } catch (err) {
    console.error(cError(`Check directory existence failed: ${err}`));
    throw err;
  }
}

export const makeDir = async (path: string): Promise<void> => {
  try {
    await fse.mkdir(path);
    console.log(cSuccess(`Successfully create directory: ${path}`));
  } catch (err) {
    console.error(cError(`Create directory failed: ${err}`));
    throw err;
  }
}

export const removeDir = async (path: string): Promise<void> => {
  try {
    await fse.remove(path);
    console.log(cSuccess(`Successfully remove directory: ${path}`));
  } catch (err) {
    console.error(cError(`Remove directory failed: ${err}`));
    throw err;
  }
}


export const readFile = async (path:string):Promise<string> => {
  try {
    const file = await readFileSync(path,'utf8')
    return file
  } catch (err) {
    console.error(cError(`Read directory failed: ${err}`));
    throw err;
  }
}
