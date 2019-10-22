const path = require('path')

const obj = {
  'txt': 'text/plain',
  'html': 'text/html',
  'css': 'text/css',
  'js': 'text/javascript',
  'json': 'application/json',
  'jpg': 'image/jpeg',
  'png': 'image/png',
  'md': 'application/x-genesis-rom'
}


module.exports = contentType = (pathUrl) => {
  // console.log(pathUrl)
  let ext = path.extname(pathUrl)
  				.split('.')
  				.pop()
  				.toLowerCase()
  if (!ext) {
    ext = pathUrl
  }
  return obj[ext] || obj['txt']
}