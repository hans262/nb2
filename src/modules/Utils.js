class Utils {
  constructor() {
  }
  static parsePostData(req) {
    if (req.method !== 'POST') return
    return new Promise((resolve, reject) => {
      let str = ''
      req.on('data', chunk => str += chunk)
      req.on('end', () => {
        resolve(str)
      })
    })
  }
  static hasBody(req) {
    return 'transfer-encoding' in req.headers || 'content-length' in req.headers
  }
  static parseBoundary(req) {
    let contentType = req.headers['content-type']
    if (!contentType) return
    return contentType.split(';')[1].split('=')[1].trim()
  }
}
module.exports = Utils
