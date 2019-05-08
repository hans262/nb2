const { join } = require('path')

const paths = __dirname.split('src')

const SOURCE = paths[0]
const LOG_PATH = join(SOURCE, '/log')

module.exports = {
  SOURCE,
  LOG_PATH
}