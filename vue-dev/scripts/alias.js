// 提供了真实路径的隐射关系
const path = require('path')

// __dirname就是当前目录，也就是scripts目录，第二个参数是从当前目录向上回溯一级，那么就是
// 根目录了，由根目录向下访问指定的目录，这样就直接解决了路径的问题
const resolve = p => path.resolve(__dirname, '../', p)

module.exports = {
  vue: resolve('src/platforms/web/entry-runtime-with-compiler'),
  compiler: resolve('src/compiler'),
  core: resolve('src/core'),
  shared: resolve('src/shared'),
  web: resolve('src/platforms/web'),
  weex: resolve('src/platforms/weex'),
  server: resolve('src/server'),
  sfc: resolve('src/sfc')
}
