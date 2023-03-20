import fs from 'fs'
import { CRed } from './chalk'

export const readDir = (path: string) => new Promise((resolve, reject) => {
  fs.readdir(path,(err)=>{
    if(!err){
      resolve('')
    }else{
      reject(CRed('Not exist dir'))
    }
  })
})

export const mkdir = (path:string) => new Promise((resolve, reject) => {
  fs.mkdir(path,err=>{
    if(!err){
      resolve('')
    }else{
      reject(CRed('Can not make dir'))
    }
  })
})