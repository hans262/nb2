import { readFileSync } from 'fs';
import { PACKAGE_PATH } from '../utils/path';

const reader = readFileSync(PACKAGE_PATH)
const packageConf = JSON.parse(reader.toString())

export default packageConf