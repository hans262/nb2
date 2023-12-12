import { readFileSync } from "node:fs";
import { WebServer } from "../src/index.js";
import { join } from "node:path";
import { proxy } from "./middleware/proxy.js";
import { PATH } from "./common/constant.js";
import "./controller/index.js";
import { createEntitySql } from "./common/mysql.js";

createEntitySql();

const app = new WebServer({
  port: 8080,
  https: {
    key: readFileSync(join(PATH.__public(), "./localhost+1-key.pem")),
    cert: readFileSync(join(PATH.__public(), "localhost+1.pem")),
  },
  spa: true,
  staticRoot: PATH.__public(),
  logDir: PATH.__log(),
  apiPrefix: "/api",
});

app.use(proxy);

app.run();

/**
 * 解决端口占用
 *
 * # mac关闭端口进程
 * sudo lsof -i :端口号
 * sudo kill 进程ID
 *
 */
