import fs from 'fs'
import { cError } from './chalk'

export const readDir = (path: string) => new Promise((resolve, reject) => {
  fs.readdir(path,(err)=>{
    if(!err){
      resolve(true)
    }else{
      resolve(false)
    }
  })
})

export const mkdir = (path:string) => new Promise((resolve, reject) => {
  fs.mkdir(path,err=>{
    if(!err){
      resolve('')
    }else{
      reject(cError('Can not make dir'))
    }
  })
})

export const rmdir = (path:string) => new Promise((resolve, reject) => {
  fs.rm(path,{recursive: true},err=>{
    if(!err){
      resolve('')
    }else{
      reject(cError('Can not remove dir'))
    }
  })
})