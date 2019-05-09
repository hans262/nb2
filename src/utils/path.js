const { join } = require('path')

const SOURCE = join(__dirname, '../../')
const LOG_PATH = join(SOURCE, '/log')
const CONTROLLER_PATH = join(SOURCE, '/src/controller')
const PUBLIC_PATH=join(SOURCE, '/public')

module.exports = {
  SOURCE,
  LOG_PATH,
  CONTROLLER_PATH,
  PUBLIC_PATH
}