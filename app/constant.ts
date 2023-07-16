import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * ROOT 项目根目录
 * 此处split分割字符与ts构建目录outDir一致
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const ROOT = __dirname.split('out')[0]
export const PUBLIC_PATH = join(ROOT, '/public')

//是否允许跨域
export const CROSS = true

//当前用户
export const USER = {
  username: "root",
  password: "123456"
} as const

//是否开启登陆校验
export const LOGIN = false

//客户端token过期时间 单位 分钟
export const TOKEN_EXPIRES = 20

//代理配置
export const proxyConfig = {
  '/proxy': 'http://127.0.0.1:7777',
  '/douban': 'https://movie.douban.com',
  '/package/lodash': 'https://www.npmjs.com',
  '/hot': 'https://www.zhihu.com'
} as const