const fs = require('fs')
const path = require('path')
const readPackage = require('read-pkg')

export const resolvePkg = async(context) => {
  if (fs.existsSync(path.join(context, 'package.json'))) {
    return await readPackage({ cwd: context })
  }
  return {}
}
