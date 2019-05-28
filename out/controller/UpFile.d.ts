/// <reference types="node" />
import { Req } from '../Interface/Req';
import { ServerResponse } from 'http';
/**
 * 上传 目前只支持单个文件上传
 */
export default class UpFile {
    static PATH: string;
    POST(req: Req, res: ServerResponse): void;
}
