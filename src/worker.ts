import { PORT } from './configure';
import { Nicest } from './service/Worker';

const nicest = new Nicest()
nicest.listen(PORT)