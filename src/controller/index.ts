import DownLoad from './DownLoad';
import Restart from './Restart';
import ShutDown from './ShutDown';
import TestGet from './TestGet';
import TestJsonp from './TestJsonp';
import TestPost from './TestPost';
import UpFile from './UpFile';

const CONTROLLER: Array<any> = [
  DownLoad,
  Restart,
  ShutDown,
  TestGet,
  TestJsonp,
  TestPost,
  UpFile
]

export default CONTROLLER