import { readFileSync } from 'fs';
import { PACKAGE_PATH } from '../utils/path';

const reader: Buffer = readFileSync(PACKAGE_PATH)
const packageConf: any = JSON.parse(reader.toString())

export default packageConf