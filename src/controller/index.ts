import { Controller } from '../Interface/Controller';
import DownLoad from './DownLoad';
import Restart from './Restart';
import ShutDown from './ShutDown';
import TestGet from './TestGet';
import TestJsonp from './TestJsonp';
import TestPost from './TestPost';
import UpFile from './UpFile';
import UpFiles from './UpFiles';

const CONTROLLER: Array<Controller> = [
  DownLoad,
  Restart,
  ShutDown,
  TestGet,
  TestJsonp,
  TestPost,
  UpFile,
  UpFiles
]

export default CONTROLLER