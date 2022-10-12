import { User } from "../interface/User.js";

export const PORT: number = 5000
export const HOST: string = "127.0.0.1"

export const HTTPS = true
export const DOMAIN = (HTTPS ? 'https://' : 'http://') + HOST + ':' + PORT

//静态资源
export const STATIC_PATH: string = "/"
export const INDEX_PAGE: string = "index.html"

export const ZIP_MATCH: string = "^\.(css|js|html|woff)$"
export const CLUSTER: boolean = false

//强缓存的保存时间 单位 秒
export const CACHE_MAX_AGE: number = 3600 * 12

//跨域
export const CROSS: boolean = true

//是否开启登陆认证
export const LOGIN: boolean = false
//客户端auth保存时间 单位 分钟
export const TOKEN_EXPIRES: number = 20
//当前用户
export const USER: User = {
  username: "root",
  password: "123456"
} as const

//reactapp 的路由匹配规则
export const REACT_APP: boolean = false

//port
export const WEB_SOCKET_PORT: number = 8888
export const SOCKET_SERVER_PORT: number = 9999

//proxy
export const proxyConfig = {
  '/proxy': 'http://127.0.0.1:7777',
  '/douban': 'https://movie.douban.com/'
} as const
