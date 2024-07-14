import { Dopx } from "../src/index.js";
import { __Test2, __Test } from "./Test.js";

const app = new Dopx({
  port: 8080,
  spa: true,
  staticRoot: "/",
  apiPrefix: "/api",
});

app.controllers(__Test, __Test2);

app.run();
