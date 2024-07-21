import { Dopx } from "../src/index.js";
import { Test, Test2 } from "./controllers.js";

const app = new Dopx({
  port: 8080,
  static: "/",
  cors: true,
});

app.controllers("/api", Test);
app.controllers("/admin", Test2);

app.run();
