import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * ROOT 项目根目录
 * 此处split分割字符与ts构建目录outDir一致
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const PATH = {
  root: __dirname.split('out')[0],
  /**相对路径 */
  public: '/public',
  /**绝对路径 */
  __public: function () {
    return join(this.root, this.public)
  },

  upload: '/upfiles',
  __upload: function () {
    return join(this.__public(), this.upload)
  },

  log: '/logs',
  __log: function () {
    return join(this.__public(), this.log)
  }
}

//代理配置
export const proxyConfig = {
  '/proxy': 'http://127.0.0.1:7777',
  '/douban': 'https://movie.douban.com',
  '/package/lodash': 'https://www.npmjs.com',
  '/hot': 'https://www.zhihu.com'
} as const

//jwt_token过期时间 单位/秒
export const JWTExp = 1 * 60 * 60
//jwt_token签发钥匙
export const JWTSecretKey = 'hans262'