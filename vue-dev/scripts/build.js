const fs = require('fs')
const path = require('path')
const zlib = require('zlib')
const rollup = require('rollup')
// terser是适用于ES6+的解析器和压缩程序包
const terser = require('terser')

// 创建dist目录
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist')
}

let builds = require('./config').getAllBuilds()
// console.log('-----builds1', builds)
// filter builds via command line arg

// process.argv[2]对应着--符号后的参数,比如编译命令是:
// "build:ssr": "npm run build -- web-runtime-cjs,web-server-renderer",则process.argv
// 是：[ '/usr/local/bin/node',
// '/Applications/workspace/Vue2.5CodeParse/vue-dev/scripts/build.js',
// 'web-runtime-cjs,web-server-renderer' ]
// 数组第一个元素是node，第二个元素就是执行的命令，第三个参数就是命令的参数,那么process.argv[2]就是
// web-runtime-cjs,web-server-renderer，
if (process.argv[2]) {
  
  const filters = process.argv[2].split(',')
  // 把不需要打包的配置项过滤掉
  builds = builds.filter(b => {
    return filters.some(f => b.output.file.indexOf(f) > -1 || b._name.indexOf(f) > -1)
  })
} else {
  // filter out weex builds by default
  builds = builds.filter(b => {
    return b.output.file.indexOf('weex') === -1
  })
}

// console.log('--------b--------', builds);
// 开始编译就调用build函数
build(builds)

function build (builds) {
  let built = 0
  // console.log('----------build', builds)
  const total = builds.length
  const next = () => {
    buildEntry(builds[built]).then(() => {
      built++
      if (built < total) {
        next()
      }
    }).catch(logError)
  }

  next()
}

function buildEntry (config) {

  const output = config.output
  // 获取output中的file和banner内容
  const { file, banner } = output
  // 检测配置文件的file字符串是否有prod或者min字样，若有则表示要打包成prod项目
  const isProd = /(min|prod)\.js$/.test(file)
  return rollup.rollup(config)
    .then(bundle => { 
      return bundle.generate(output)
    })
    .then(({ output: [{ code }] }) => {
      // console.log('--------------buildEntry----------', code)
      if (isProd) {
        const minified = (banner ? banner + '\n' : '') + terser.minify(code, {
          toplevel: true,
          output: {
            ascii_only: true
          },
          compress: {
            pure_funcs: ['makeMap']
          }
        }).code
        // 线上环境执行代码压缩
        return write(file, minified, true)
      } else {
        return write(file, code)

      }
    })
}


// 把生成的文件写入dist目录下
function write (dest, code, zip) {
  return new Promise((resolve, reject) => {
    // 在控制台打印日志
    function report (extra) {
      console.log('------------report----------', path.relative(process.cwd(), dest))
      // process.cwd是当前执行nodejs的文件夹地址，也就是当前项目的地址，这里的地址就是
      // /Applications/workspace/Vue2.5CodeParse/vue-dev
      // path.relative可以通过两个绝对路径找出相对路径的起源位置
      console.log(blue(path.relative(process.cwd(), dest)) + ' ' + getSize(code) + (extra || ''))
      resolve()
    }

    fs.writeFile(dest, code, err => {
      // 如果写入文件出错则reject
      if (err) return reject(err)
      // 若启用zip压缩则用gzip执行代码压缩
      if (zip) {
        zlib.gzip(code, (err, zipped) => {
          if (err) return reject(err)
          report(' (gzipped: ' + getSize(zipped) + ')')
        })
      } else {
        report()
      }
    })
  })
}
// 获取编译文件的大小 
function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function logError (e) {
  console.log(e)
}
// nodejs控制台彩色文字输出,这里输入蓝色文字
function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}
