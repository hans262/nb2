const { join } = require('path')

const SOURCE = join(__dirname,'../../')
const LOG_PATH = join(SOURCE, '/log')

module.exports = {
  SOURCE,
  LOG_PATH
}