import { Dopx } from "../src/index.js";
import { Test } from "./Test.js";

const dopx = new Dopx({
  port: 8080,
  // spa: true,
  // staticRoot: "/",
  apiPrefix: "/api",
});

dopx.controllers(Test);

dopx.run();
