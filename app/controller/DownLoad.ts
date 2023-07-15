import { createReadStream } from 'node:fs';
import { join } from 'node:path';
import { Controller, Context } from '../../src/index.js';
import { PUBLIC_PATH } from '../constant.js';

export class DownLoad implements Controller {
  readonly PATH_NAME: string = '/api/download'
  POST(ctx: Context) {
    const file = 'c.png'
    const filename = join(PUBLIC_PATH, file)
    ctx.res.setHeader('Content-Type', 'application/octet-stream; charset=utf-8')
    ctx.res.setHeader('Content-Disposition', `attachment; filename=${file}`)
    createReadStream(filename).pipe(ctx.res)
  }
}

/*
  前端代码
  let filename;
  const blob = await fetch('/api/download', { method: 'POST' })
    .then(res => {
      const cd = res.headers.get('Content-Disposition')
      let [_, _filename] = cd.match(/filename=([^;]+)/) ?? []
      filename = _filename
      return res.blob()
    })
  // console.log(ret, m)

  // 创建下载链接
  const href = window.URL.createObjectURL(blob)
  // 创建a标签并为其添加属性
  const link = document.createElement('a')
  link.href = href
  link.download = filename
  // 触发事件
  link.click()
*/