import { Controller } from '../Interface/Controller';
import { DownLoad } from './DownLoad';
import { GetToken } from './GetToken';
import { LoginPage } from './LoginPage';
import { Restart } from './Restart';
import { ShutDown } from './ShutDown';
import { TestGet } from './TestGet';
import { TestJsonp } from './TestJsonp';
import { TestPost } from './TestPost';
import { TestRand } from './TestRand';
import { UpFiles } from './UpFiles';

const combineController = <T>(...clazz: { new(): T }[]) => clazz.map(c => new c())

const CONTROLLER = combineController<Controller>(
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

export default CONTROLLER