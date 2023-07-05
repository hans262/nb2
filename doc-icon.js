import fs from 'node:fs'

fs.copyFileSync('./public/vite.svg', './docs/vite.svg');

['./docs/index.html', './docs/modules.html'].forEach(fileName => {
  const data = fs.readFileSync(fileName).toString('utf-8')

  const tmp = data.split('<head>')

  const result = tmp[0] + '<head><link rel=icon type=image/svg+xml href=/nicest/vite.svg />' + tmp[1]

  fs.writeFileSync(fileName, result);
})
