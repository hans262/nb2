import { Nb2, controllers, cors, statics } from "../src/index.js";
import { Test, Test2 } from "./controllers.js";

const nb = new Nb2({ port: 8080 });

nb.use(cors());
nb.use(controllers("/api", Test, Test2));
nb.use(controllers("/admin", Test2));
nb.use(statics("/"));

nb.run();
