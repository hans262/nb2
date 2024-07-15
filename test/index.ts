import { Dopx } from "../src/index.js";
import { Test } from "./Test.js";

const dopx = new Dopx({
  port: 8080,
  apiPrefix: "/api",
  static: {
    root: "/",
  },
  // logDir:'/Users/macbookair/Desktop/develop/dopx/logs'
});

dopx.controllers(Test);

dopx.run();
