import { readFileSync } from 'fs';
import { PACKAGE_PATH } from '../utils/path';

const read = readFileSync(PACKAGE_PATH)
const packageConf = JSON.parse(read.toString())

export default packageConf