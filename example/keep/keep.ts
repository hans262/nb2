import { createReadStream, createWriteStream } from "node:fs";
import posix from "node:path/posix";
import { createGzip, createGunzip } from "node:zlib";
import * as http from "node:http";
import * as https from "node:https";
import {
  createHash,
  createHmac,
  createCipheriv,
  createDecipheriv,
  CipherKey,
  BinaryLike,
} from "node:crypto";

/**
 * gzip 压缩
 * 默认存放到原始文件目录
 * @param name
 */
export function toGzip(name: string) {
  const gzip = createGzip();
  const inp = createReadStream(name);
  const out = createWriteStream(name + ".gz");
  inp.pipe(gzip).pipe(out);
}

/**
 * gzip 解压
 * 默认存放到原始文件目录
 * @param name
 */
export function unGzip(name: string) {
  const ext = posix.extname(name);
  const newFileName = name.split(ext)[0];
  const gzip = createGunzip();
  const inp = createReadStream(name);
  const out = createWriteStream(newFileName);
  inp.pipe(gzip).pipe(out);
}

/**
 * base64 编码
 * @param data
 */
export function encodeBase64(data: string) {
  return Buffer.from(data).toString("base64");
}

/**
 * base64 解码
 * @param data
 */
export function decodeBase64(data: string) {
  return Buffer.from(data, "base64").toString();
}

/**
 * 网络请求 请求
 * @param opt
 */
export function fetchOn(
  _url: string,
  opt?: {
    method?: string;
    body?: string | Buffer;
  }
) {
  const url = new URL(_url);
  const rejectUnauthorized =
    url.protocol === "https:" &&
    (url.hostname === "127.0.0.1" ||
      url.hostname === "localhost" ||
      url.hostname === "0.0.0.0")
      ? false
      : true;

  return new Promise<{
    status?: number;
    data: Buffer;
  }>((resolve, reject) => {
    const request = url.protocol === "https:" ? https.request : http.request;
    const req = request(
      {
        path: url.pathname + url.search,
        hostname: url.hostname,
        port: url.port,
        method: opt?.method ?? "GET",
        rejectUnauthorized, //拒绝本地自签名证书的校验
      },
      (ret) => {
        const chunks: Buffer[] = [];
        req.on("data", (chunk: Buffer) => {
          chunks.push(chunk);
        });

        req.on("end", () => {
          const data = Buffer.concat(chunks);
          resolve({ status: ret.statusCode, data });
        });
      }
    );

    req.on("error", (err) => {
      reject(err);
    });

    if (opt?.method === "POST" && opt.body) {
      req.write(opt.body);
    }

    req.end();
  });
}

/**
 * 创建哈希密钥
 * 支持算法 md5 sha1 sha256 sha512
 * @param data
 * @param hash
 */
export function createHashSecret(
  data: string,
  hash: "md5" | "sha1" | "sha256" | "sha512" = "sha1"
) {
  return createHash(hash).update(data).digest("hex");
}

/**
 * 创建Hmac密钥
 * 支持算法 md5 sha1 sha256 sha512  16进制
 * @param data 加密源
 * @param key 密钥
 */
export function createHmacSecret(
  data: string,
  key: string,
  hash: "md5" | "sha1" | "sha256" | "sha512" = "sha1"
) {
  return createHmac(hash, key).update(data).digest("hex");
}

/**
 * aes加密 ->
 * 支持算法 aes-128-cbc
 * @param data 加密源
 * @param key 密钥
 * @param iv 密钥向量
 */
export function toCipheriv(data: string, key: CipherKey, iv: BinaryLike) {
  const cipher = createCipheriv("aes-128-cbc", key, iv);
  let crypted = cipher.update(data, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
}

/**
 * aes解密 ->
 * @param data 解密源
 * @param key 密钥
 * @param iv 密钥向量
 */
export function deCipheriv(data: string, key: BinaryLike, iv: BinaryLike) {
  const decipher = createDecipheriv("aes-128-cbc", key, iv);
  let decrypted = decipher.update(data, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

//单利
export class Logger {
  private constructor() {}
  private static _self?: Logger;
  static get self() {
    if (!this._self) {
      this._self = new Logger();
    }
    return this._self;
  }
}