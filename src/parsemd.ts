const { Remarkable } = require('remarkable')
import { readdir, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import { ROOT } from './common/path'
const md = new Remarkable()

readdir(join(ROOT, './tsdoc'), (err, files) => {
  if (err) return
  files.forEach(f => {
    if (!/.+\.md$/.test(f)) return
    console.log(f)
    const b = readFileSync(join(ROOT, './tsdoc', f))
    const r = md.render(b.toString())
    let fname = f.split('.md')[0] + '.html'
    writeFileSync(join(ROOT, './tsdoc', fname), r)
  })
})