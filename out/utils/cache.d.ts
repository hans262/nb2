/// <reference types="node" />
import { Stats } from 'fs';
import { Req } from '../Interface/Req';
/**
 * 生成ETag
 * @param stats
 */
export declare function generateETag(stats: Stats): string;
/**
 * 验证缓存
 * @param req
 */
export declare function isCache(req: Req): boolean;
