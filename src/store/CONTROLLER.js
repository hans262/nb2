const path = require('path')
const fs = require('fs')

const CONTROLLER = []
function useController(controller) {
  CONTROLLER.push(controller)
}

const BASE_PATH = __dirname.split('src')[0]
const CONTROLLER_PATH = path.join(BASE_PATH, '/src/controller/')

try {
  const files = fs.readdirSync(CONTROLLER_PATH)
  files.forEach(f => {
    const c = require('../controller/' + f)
    useController(c)
  })
} catch (error) {
  console.error(error)
}

module.exports = {
  CONTROLLER
}