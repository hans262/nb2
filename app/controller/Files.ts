import { createReadStream, writeFileSync } from "node:fs";
import { extname, join } from "node:path";
import {
  Context,
  createHashSecret,
  Controller,
  Post,
} from "../../src/index.js";
import { PATH } from "../common/constant.js";

/**
 * 文件上传 ｜ 下载
 * 支持格式：FormData | ArrayBuffer
 */
@Controller("files")
export class Files {
  @Post("download")
  download(ctx: Context) {
    const file = "c.png";
    const filename = join(PATH.__public(), file);
    ctx.statusCode(200);
    ctx.res.setHeader("Content-Type", ctx.getContentType("octet-stream"));
    ctx.res.setHeader("Content-Disposition", `attachment; filename=${file}`);
    createReadStream(filename).pipe(ctx.res);
  }

  /**限制最大上传，单位MB*/
  maxSize = 1024 * 10;

  /**
   * 创建新的文件名
   * @param name
   */
  createFileName(name: string) {
    const ext = extname(name);
    const base = name.split(ext)[0];
    return base + "." + createHashSecret(base) + ext;
  }

  @Post("upload")
  async upload(ctx: Context) {
    // console.log(ctx.req.headers)

    const [contentLength, contentType] = [
      parseInt(ctx.req.headers["content-length"] ?? ""),
      ctx.req.headers["content-type"],
    ];

    const boundary = contentType?.match(/boundary=([^;]+)/)?.[1];
    const filename = contentType?.match(/filename=([^;]+)/)?.[1];

    //NaN | 0 排除
    if (!contentLength) {
      return ctx.statusCode(200).json({
        code: 400,
        result: `content-length错误，contentLength：${contentLength}`,
      });
    }

    //超尺寸限制限制
    if (contentLength > this.maxSize * 1024 * 1024) {
      return ctx.statusCode(200).json({
        code: 400,
        result: `超出最大上传尺寸${this.maxSize}mb`,
      });
    }

    // 解析数据
    if (contentType?.includes("multipart/form-data") && boundary) {
      /**
       * 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundaryuA6k9Vw0kI6GjOjd'
       * 前端不用设置content-type，会自动设置，手动设置，需要指定boundary
       */

      //接收数据
      const body = await ctx.getBodyData("buffer");
      const ret = ctx.parseFormData(body, boundary, contentLength);

      //写入文件
      ret.forEach((d) => {
        if (d.filename) {
          writeFileSync(
            join(PATH.__upload(), this.createFileName(d.filename)),
            d.data
          );
        }
      });

      const ret2 = ret.map((d) => {
        let newFileName: string | undefined, url: string | undefined;

        if (d.filename) {
          newFileName = this.createFileName(d.filename);
          //实现返回文件，的访问url地址
          url = join(ctx.app.domain, PATH.upload, newFileName);
          //写入文件
          writeFileSync(join(PATH.__upload(), newFileName), d.data);
        }

        return {
          type: d.ContentType,
          filename: d.filename,
          newFileName,
          url,
        };
      });
      return ctx.statusCode(200).json({ code: 1000, result: ret2 });
    } else if (contentType?.includes("arraybuffer") && filename) {
      /**
       * 'content-type': 'arraybuffer; filename=a.txt'
       * 前端需要设置content-type，文件名等
       */
      //接收数据
      const body = await ctx.getBodyData("buffer");
      const newFileName = this.createFileName(filename);
      writeFileSync(join(PATH.__upload(), newFileName), body);

      //返回文件信息 还未实现
      return ctx.statusCode(200).json({ code: 1000, result: "上传成功" });
    }

    ctx.statusCode(200).json({
      code: 1000,
      result: `不支持的content-type: ${contentType}`,
    });
  }
}

/*
  下载 前端代码
  let filename;
  const blob = await fetch('/api/files/download', { method: 'POST' })
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
