import { Controller } from '../Interface/Controller';
import { DownLoad } from './DownLoad';
import { Restart } from './Restart';
import { ShutDown } from './ShutDown';
import { TestGet } from './TestGet';
import { TestJsonp } from './TestJsonp';
import { TestPost } from './TestPost';
import { TestRand } from './TestRand';
import { UpFiles } from './UpFiles';

const CONTROLLER: Array<Controller> = [
  new DownLoad,
  new Restart,
  new ShutDown,
  new TestGet,
  new TestJsonp,
  new TestPost,
  new UpFiles,
  new TestRand
]

export default CONTROLLER