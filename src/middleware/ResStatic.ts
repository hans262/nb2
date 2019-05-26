import { stat } from 'fs'
import ResNotFound from '../respond/ResNotFound'
import ResDir from '../respond/ResDir'
import ResFile from '../respond/ResFile'

export default function ResStatic(req, res, next) {
  const { absolutePath } = req

  stat(absolutePath, (err, stats) => {
    if (err) {
      return ResNotFound(req, res)
    }

    req.stats = stats

    if (stats.isDirectory()) {
      return ResDir(req, res)
    }

    if (stats.isFile()) {
      return ResFile(req, res)
    }
  })
}