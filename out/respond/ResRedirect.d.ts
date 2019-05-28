/// <reference types="node" />
import { ServerResponse } from 'http';
/**
 * 重定向 301永久/302临时
 * @param redirect
 */
export default function ResRedirect(redirect: Redirect): void;
interface Redirect {
    res: ServerResponse;
    location: string;
    code: number;
    reasonPhrase: string;
}
export {};
