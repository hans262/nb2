import { Dopx } from "../src/index.js";
import { Test, Test2 } from "./Test.js";

const dopx = new Dopx({
  port: 8080,
  static: "/",
  cors: true,
});

dopx.controllers("/api", Test);
dopx.controllers("/admin", Test2);

dopx.run();
