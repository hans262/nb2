import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * ROOT 项目根目录
 * 此处split分割字符与ts构建目录outDir一致
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const ROOT: string = __dirname.split('out')[0]
export const LOGS_PATH: string = join(ROOT, '/logs')
export const PUBLIC_PATH: string = join(ROOT, '/public')