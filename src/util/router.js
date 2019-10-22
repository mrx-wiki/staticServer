const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const config = require('../config/serverConfig')
const ContentType = require('./ContentType')
const compress = require('./compress')
const range = require('./range')
const isFresh = require('./cache')

// 组装模板
const tplPath = path.join(__dirname,'../template/dir.tpl')
const source = fs.readFileSync(tplPath)
const template = handlebars.compile(source.toString())





// 识别路由
module.exports = async function (req, res, pathUrl) {
  try {
    const stats = await stat(pathUrl)
    if(stats.isFile()){
      // 动态设置文件类型
      const type = ContentType(pathUrl)
      res.setHeader('Content-Type',type)
      // console.log(path.extname(pathUrl))
      // 判断缓存
      if(isFresh(stats,req,res)){
        res.statusCode = 304
        res.end()
        return
      }

      // 划定range范围
      let readStream;
      const { code, start, end } = range(stats.size, req, res)
      if(code === 200){
        // 没有请求范围
        res.statusCode = 200
        readStream = fs.createReadStream(pathUrl)
      }else{
        // 有请求范围
        res.statusCode = 206
        readStream = fs.createReadStream(pathUrl,{start,end})
      }
      // fs.createReadStream(pathUrl).pipe(res)
      // let readStream = fs.createReadStream(pathUrl)
      // 压缩文件
      if(pathUrl.match(config.compress)){
        readStream = compress(readStream, req, res)
      }
      readStream.pipe(res)
    }else if(stats.isDirectory()){
      const files = await readdir(pathUrl)
      res.statusCode = 200
      res.setHeader('Content-Type','text/html')
      const dir = path.relative(config.root, pathUrl)
      const data = {
        title: path.basename(pathUrl),
        dir: dir ? `/${dir}` : '',
        root: config.root,
        files
      }
      res.end(template(data))
    }
  }catch(e){
    res.statusCode = 404
    res.setHeader('Content-Type','text/plain')
    res.end(`${pathUrl} is not a file or directory!!!`)
  }
}