
const { cache } = require('../config/serverConfig')

function refreshRes (stats,res) {
  // console.log(cache)
  const { maxAge, expires, cacheControl, lastModified, etag } = cache
  if(expires) {
  // console.log('expires')
    res.setHeader('Expires',(new Date(Date.now() + maxAge * 1000)).toUTCString())
  }

  if(cacheControl){
  // console.log('cacheControl')
    res.setHeader('Cache-Control',`public,max-age=${maxAge}`)
  }

  if(lastModified){
  	// console.log('lastModified')
    res.setHeader('Last-Modified',stats.mtime.toUTCString())
  }

  if(etag){
  	// console.log('etag')
    res.setHeader('ETag',`${stats.size}-${stats.mtime.toUTCString()}`)
  }
}


module.exports = function isFresh(stats, req, res){
  
  refreshRes(stats,res)
  const lastModified = req.headers['if-modified-since']
  const etag = req.headers['if-none-match']
  if(!lastModified && !etag){
    return false
  }
  
  if(lastModified && lastModified !== res.getHeader('Last-Modified')){
  	return false
  }

  if(etag && etag !== res.getHeader('ETag')){
    return false
  }
  return true
}




