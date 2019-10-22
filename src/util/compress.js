const { createGzip, createDeflate } = require('zlib')



module.exports = (readStream, req, res) => {
 const ae = req.headers['accept-encoding']
 if (!ae || !ae.match(/\b(gzip|deflate)\b/)){
   return readStream
 }else if(ae.match(/\bgzip\b/)){
 		res.setHeader('Content-Encoding','gzip')
 		return readStream.pipe(createGzip())
}else if(ae.match(/\deflate\b/)){
 		res.setHeader('Content-Encoding','deflate')
 		return readStream.pipe(createDeflate())
}
}