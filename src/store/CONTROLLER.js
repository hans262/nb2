const fs = require('fs')
const { CONTROLLER_PATH } = require('../utils/path')

const CONTROLLER = []
function useController(controller) {
  CONTROLLER.push(controller)
}

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