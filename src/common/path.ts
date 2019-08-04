import { join } from 'path';

export const ROOT: string = join(__dirname, '../../')
export const LOGS_PATH: string = join(ROOT, '/logs')
export const PUBLIC_PATH: string = join(ROOT, '/public')
export const FAVION_PATH: string = join(PUBLIC_PATH, '/favicon.ico')