import { readdirSync } from 'fs'
import { join } from 'path'
import { CONTROLLER_PATH } from '../utils/path'

export const CONTROLLER = []
function useController(controller) {
  CONTROLLER.push(controller)
}

try {
  const files = readdirSync(CONTROLLER_PATH)
  files.forEach(async (f) => {
    const c=await import(join(CONTROLLER_PATH, 'Restart.ts'))
    useController(c)
  })
} catch (error) {
  console.error(error)
}