import { Dopx, controllers, cors, statics } from "../src/index.js";
import { Test, Test2 } from "./controllers.js";

const app = new Dopx({ port: 8080 });

app.use(cors());
app.use(controllers("/api", Test, Test2));
app.use(controllers("/admin", Test2));

app.use(statics());

app.run();
