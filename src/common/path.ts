import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * ROOT 此处存在ts构建问题，构建后路径错乱
 * 取舍：可使用截断__dirname的src位置处，
 * 也不是最完美方案
 * 待后续完善 --
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const ROOT: string = join(__dirname, '../../')
export const LOGS_PATH: string = join(ROOT, '/logs')
export const PUBLIC_PATH: string = join(ROOT, '/public')
export const FAVION_PATH: string = join(PUBLIC_PATH, '/favicon.ico')