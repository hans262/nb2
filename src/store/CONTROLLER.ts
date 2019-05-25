const fs = require('fs')
const { join } = require('path')
import { CONTROLLER_PATH } from '../utils/path'
export const CONTROLLER = []

function useController(controller) {
  CONTROLLER.push(controller)
}

try {
  const files = fs.readdirSync(CONTROLLER_PATH)
  files.forEach(f => {
    const c = require(join(CONTROLLER_PATH, f))
    useController(c)
  })
} catch (error) {
  console.error(error)
}