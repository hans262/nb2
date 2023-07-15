import { ServerResponse } from 'node:http';
import { writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';
import { Controller, Context, parseFormData, createSecretKey, getBodyData } from '../../src/index.js';
import { PUBLIC_PATH } from '../constant.js';

/**
 * 文件上传
 * FormData格式
 * 所需请求头 ->
 * Content-Type:"multipart/form-data; boundary=----WebKitFormBoundaryTK4tKRxDd34z0iSh"
 * Content-Length:"1024"
 * Content-Type:multipart/form-data 前端不要设置这个，会自动识别，
 * 这样能带上分隔符boundary，自己设置需要自己定义boundary
 */

export class UpFiles implements Controller {
  readonly PATH_NAME: string = '/api/upfiles'
  /**限制最大上传10MB*/
  maxSize = 100

  handleFailed(res: ServerResponse, reason: string) {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify({ success: false, result: reason }))
  }

  handleSuccess(res: ServerResponse, msg: string) {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify({ success: true, result: msg }))
  }

  parseHeader(ctx: Context) {
    let contentType: string | undefined, boundary: string | undefined,
      contentLength: number | undefined;

    const len = ctx.req.headers['content-length']
    contentLength = len ? parseInt(len) : undefined

    const ct = ctx.req.headers['content-type']

    if (ct) {
      let tmp = ct.split('; ') as (string | undefined)[]
      contentType = tmp[0]
      boundary = tmp[1]
    }
    //解析boundary
    if (boundary) {
      boundary = (boundary.match(/^boundary=([^;]+)$/) ?? [])[1]
    }
    return { contentType, boundary, contentLength }
  }

  async POST(ctx: Context) {
    const { req, res } = ctx
    // console.log(req.headers)
    const { contentType, boundary, contentLength } = this.parseHeader(ctx)

    //拿到content-length，非空检查
    if (!contentLength) {
      return this.handleFailed(res, 'content-length不存在，或者不合法')
    }

    //做大小限制
    if (contentLength > this.maxSize * 1024 * 1024) {
      return this.handleFailed(res, `超出最大上传尺寸${this.maxSize}mb`)
    }

    //接收数据
    const buf = await getBodyData(ctx.req)

    // 解析formdata数据
    if (contentType === 'multipart/form-data' && boundary) {
      const ret = parseFormData(buf, boundary, contentLength)
      ret.forEach(d => {
        if (d.filename) {
          const ext = extname(d.filename)
          const base = d.filename.split(ext)[0]
          const newFileName = base + '.' + createSecretKey(base) + ext
          writeFileSync(join(PUBLIC_PATH, newFileName), d.data)
        }
      })
      this.handleSuccess(ctx.res, '上传成功')
      return
    }

    //校验contentType合不合法
    this.handleFailed(res,
      `不支持的上传类型，content-type: ${contentType}; boundary: ${boundary}`
    )
  }
}