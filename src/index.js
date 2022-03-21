#! /usr/bin/env node
const program = require('commander');
const config = require('./config/serverConfig')
const Server = require('./server')
// command：自定义执行的命令
// option：可选参数
// alias：用于 执行命令的别名
// description：命令描述
// action：执行命令后所执行的方法
// usage：用户使用提示
// parse：解析命令行参数

program
  .version(require('../package.json').version, '-v, --version') // 弹出版本
  .helpOption('-h, --help') // 弹出帮助文档

program
  .command('port <port>') // 支持的命令
  .description('set server port') // 对命令的描述
  .alias('p') // 命令的别名
  .action((port) => { //执行命令后触发的函数
  	if(port){
  	  config.port = port
	    const server = new Server(config)
	    server.start()
  	}
  })

const ifEffect = () => {
  let arr = []
  if(process.argv[2].indexOf('port') === -1 || process.argv[2].indexOf('p') === -1){
    return true
  }
}

// 处理随便输入server xxx的情况
program.on('command:*',() => {
  if(ifEffect){
    program.outputHelp()
    process.exit(1);
  }
})


if(process.argv.length <= 2){
    const server = new Server(config)
    server.start()
}
program.parse(process.argv);
