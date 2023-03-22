/**
 * chalk控制台输出
 * 风格参照Antd
*/

import chalk from 'chalk'

export const cPrimary = (text:string) => chalk.hex('#1890ff')(text)
export const cError = (text:string) => chalk.hex('#f5222d')(text)
export const cWarning = (text:string) => chalk.hex('#faad14')(text)
export const cSuccess = (text:string) => chalk.hex('#52c41a')(text)