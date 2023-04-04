import { spawn } from 'child_process'
import type{ ChildProcess } from 'child_process'

export const commandSpawn = (...args: Parameters<typeof spawn>) =>{
  return new Promise<void>((resolve, reject) => {
    const childProcess:ChildProcess = spawn(...args)
    // 在父进程中显示子进程中的标准输出流输出的信息
    // childProcess.stdout?.pipe(process.stdout)
    // 在父进程中显示子进程中的标准输出流输出的错误信息
    // childProcess.stderr?.pipe(process.stderr)
    childProcess.on('close',()=>{
      resolve()
    })
    childProcess.on('error',(err)=>{
      reject(err)
    })
  })
}
