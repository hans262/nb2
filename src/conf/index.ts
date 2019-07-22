import { User } from "../Interface/User";

export const PORT: number = 5000
export const HOST: string = "127.0.0.1"
export const ROOT: string = "C://"
export const INDEX_PAGE: string = "index.html"
export const ZIP_MATCH: string = "^\.(css|js|html|woff)$"
export const CLUSTER: boolean = false
export const CACHE: boolean = true
//unit second
export const CACHE_MAX_AGE: number = 3600
export const CROSS: boolean = true
export const LOGIN: boolean = false
export const USER: User = {
  username: "root",
  password: "123456"
}
//unit minute
export const SESSION_EXPIRES: number = 20
//is react app
export const REACT_APP: boolean = false
//api prefix
export const API_PREFIX: string = '/api'
//port
export const WEB_SOCKET_PORT: number = 8888
export const SOCKET_SERVER_PORT: number = 9999