import fs from 'fs-extra'
import path from 'path'

interface filesIntf  {
  [index:string] : string
}

const deleteRemovedFiles = (directory:string, newFiles:filesIntf, previousFiles: string[]) => {
  // get all files that are not in the new filesystem and are still existing
  const filesToDelete = previousFiles.filter(
    filename => !newFiles[filename]
  )
  if(!filesToDelete.length) return
  // delete each of these files
  return Promise.all(filesToDelete.map(filename => {
    return fs.unlink(path.join(directory, filename))
  }))
}

export const writeFileTree = async(dir:string, files: filesIntf, previousFiles?: string[]) => {
  if (previousFiles) {
    await deleteRemovedFiles(dir, files, previousFiles)
  }
  Object.keys(files).forEach((name) => {
    const filePath = path.join(dir, name)
    fs.ensureDirSync(path.dirname(filePath))
    fs.writeFileSync(filePath, files[name])
  })
}

