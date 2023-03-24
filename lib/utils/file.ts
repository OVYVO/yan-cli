import fs from 'fs-extra'
import { cError, cSuccess } from './chalk'

export const existsDir = (path: string) => new Promise((resolve, reject) => {
  fs.pathExists(path, (err,exists)=>{
    if(!err){
      resolve(exists) 
    } else{
      reject(console.log(cError(err)))
    }
  })
})

export const makeDir = (path:string) => new Promise((resolve, reject) => {
  fs.mkdir(path, err=>{
    if(!err){
      resolve(console.log(cSuccess(`Make dir ${path} success`)))
    }else{
      reject(console.log(cError(`Can not make dir ${path}! message: ${err}`)))
    }
  })
})

export const removeDir = (path:string) => new Promise((resolve, reject) => {
  fs.remove(path, err=>{
    if(!err){
      resolve(console.log(cSuccess(`Remove dir ${path} success`)))
    }else{
      reject(console.log(cError(`Can not remove dir ${path}! message: ${err}`)))
    }
  })
})