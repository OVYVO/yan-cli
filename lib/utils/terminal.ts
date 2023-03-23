import { spawn } from 'child_process' 

export const commandSpawn = (...args: Parameters<typeof spawn>) =>{
  return new Promise<void>((resolve, reject) => {
    const childProcess = spawn(...args)
    childProcess.stdout?.pipe(process.stdout)
    childProcess.stdout?.pipe(process.stderr)
    childProcess.on('close',()=>{
      resolve()
    })
    childProcess.on('error',()=>{
      reject()
    })
  })
}