import { join } from 'path';

export const SOURCE: string = join(__dirname, '../../')
export const LOG_PATH: string = join(SOURCE, '/log')
export const CONTROLLER_PATH: string = join(SOURCE, '/src/controller')
export const PUBLIC_PATH: string = join(SOURCE, '/public')
export const FAVION_PATH: string = join(PUBLIC_PATH, '/favicon.ico')