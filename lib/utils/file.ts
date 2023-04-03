import fs from 'fs-extra'
import { cError, cSuccess } from './chalk'

export const existsDir = async (path: string): Promise<boolean> => {
  try {
    const exists = await fs.pathExists(path);
    return exists;
  } catch (err) {
    console.error(cError(`Check directory existence failed: ${err}`));
    throw err;
  }
};

export const makeDir = async (path: string): Promise<void> => {
  try {
    await fs.mkdir(path);
    console.log(cSuccess(`Successfully create directory: ${path}`));
  } catch (err) {
    console.error(cError(`Create directory failed: ${err}`));
    throw err;
  }
};

export const removeDir = async (path: string): Promise<void> => {
  try {
    await fs.remove(path);
    console.log(cSuccess(`Successfully remove directory: ${path}`));
  } catch (err) {
    console.error(cError(`Remove directory failed: ${err}`));
    throw err;
  }
};