const http = require('http')
const path = require('path')

const config = require('./config/serverConfig')
const router = require('./util/router')

class Server {
  start(){
    const server = http.createServer((req,res) => {
	  const url = req.url
	  const pathUrl = path.join(config.root,url)
	    // 1.判断是文件还是文件夹
	     router(req,res,pathUrl)
	   })

		server.listen(config.port,() => {
		  console.log(`server listen on http://localhost:${config.port}`)
		})
  }
}


module.exports = Server







