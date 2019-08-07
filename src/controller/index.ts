import { Controller } from '../Interface/Controller';
import { DownLoad } from './DownLoad';
import { Restart } from './Restart';
import { ShutDown } from './ShutDown';
import { TestGet } from './TestGet';
import { TestJsonp } from './TestJsonp';
import { TestPost } from './TestPost';
import { TestRand } from './TestRand';
import { UpFiles } from './UpFiles';

const combineController = <T>(...clazz: { new(): T }[]): T[] => clazz.map<T>(c => new c())

const CONTROLLER: Controller[] = combineController<Controller>(
  DownLoad,
  Restart,
  ShutDown,
  TestGet,
  TestJsonp,
  TestPost,
  UpFiles,
  TestRand
)

export default CONTROLLER