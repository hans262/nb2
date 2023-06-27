import { combineController } from '../../src/index.js';
import { DownLoad } from './DownLoad.js';
import { GetToken } from './GetToken.js';
import { LoginPage } from './LoginPage.js';
import { Restart } from './Restart.js';
import { ShutDown } from './ShutDown.js';
import { TestGet } from './TestGet.js';
import { TestJsonp } from './TestJsonp.js';
import { TestPost } from './TestPost.js';
import { TestRand } from './TestRand.js';
import { UpFiles } from './UpFiles.js';

const Controllers = combineController(
  DownLoad,
  Restart,
  ShutDown,
  TestGet,
  TestJsonp,
  TestPost,
  UpFiles,
  TestRand,
  LoginPage,
  GetToken
)

export default Controllers