import { PORT } from './configure/index.js';
import { Nicest } from './service/Worker.js';

const nicest = new Nicest()
nicest.listen(PORT)