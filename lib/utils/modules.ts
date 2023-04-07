/**
 * 加载js模块兼容写法
 * 项目没有用到
 */

const Module = require('module')
const path = require('path')

const createRequire = Module.createRequire || function (filename) {
  const mod = new Module(filename, null)
  mod.filename = filename
  mod.paths = Module._nodeModulePaths(path.dirname(filename))
  // Module.prototype._compile用于对于第三方 js 文件进行编译加载
  mod._compile(`module.exports = require;`, filename)
  return mod.exports
}

// 查找请求文件的路径，不加载模块，只返回解析文件的文件名
export const resolveModule = (request, context) => {
  let resolvedPath
  try {
    resolvedPath = createRequire(path.resolve(context, 'package.json')).resolve(request)
  } catch (e) {
    resolvedPath = require.resolve(request, { paths: [context] })
  }
  return resolvedPath
}

export const loadModule = (request, context, force = false) => {
  try {
    // 找到package.json同级目录并执行
    // path.resolve拼接规则:正确理解应该是从后向前
    // 若字符以 / 开头，不会拼接到前面的路径；
    // 若以 ../ 开头，拼接前面的路径，且不含最后一节路径；
    // 若以 ./ 开头 或者没有符号 则拼接前面路径
    const crequire = createRequire(path.resolve(context, 'package.json'))
    return crequire(request)
  } catch (e) {
    // modules.exports = exports 此处exports即{resolveModule ,loadModule, clearModule}
    // module.exports.hello = true; // Exported from require of module
    // exports = { hello: false };  // Not exported, only available in the module    
    const resolvedPath = exports.resolveModule(request, context)
    if (resolvedPath) {
      if (force) {
        clearRequireCache(resolvedPath)
      }
      return require(resolvedPath)
    }
  }
}

export const clearModule = (request, context) => {
  const resolvedPath = exports.resolveModule(request, context)
  if (resolvedPath) {
    clearRequireCache(resolvedPath)
  }
}

function clearRequireCache (id, map = new Map()) {
  const module = require.cache[id]
  if (module) {
    map.set(id, true)
    module.children.forEach(child => {
      if (!map.get(child.id)) clearRequireCache(child.id, map)
    })
    delete require.cache[id]
  }
}