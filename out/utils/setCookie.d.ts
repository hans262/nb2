/// <reference types="node" />
import { ServerResponse } from "http";
/**
 * 设置cookie 不能设置中文
 * @param cookie Cookie
 */
export default function setCookie(cookie: Cookie): void;
export interface Cookie {
    res: ServerResponse;
    key: string;
    value: string;
    maxAge?: string;
    domain?: string;
    path?: string;
    expires?: Date;
    httpOnly?: boolean;
    secure?: boolean;
}
