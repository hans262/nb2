import { join } from 'path';

export const SOURCE: string = join(__dirname, '../../')
export const LOG_PATH: string = join(SOURCE, '/logs')
export const PUBLIC_PATH: string = join(SOURCE, '/public')
export const FAVION_PATH: string = join(PUBLIC_PATH, '/favicon.ico')
export const PACKAGE_PATH: string = join(SOURCE, '/package.json')