import { readFileSync } from "node:fs";
import { WebServer } from "../src/index.js";
import { join } from "node:path";
import { proxy } from "./middlewares/proxy.js";
import { PATH } from "./common/constant.js";
import { createEntitySql } from "./common/mysql.js";
import { AppDataSource } from "./data-source.js";
import { User__ } from "./controllers/User__.js";
import { Cashout__ } from "./controllers/Cashout__.js";
import { Collect__ } from "./controllers/Collect__.js";
import { Comment__ } from "./controllers/Comment__.js";
import { Files__ } from "./controllers/Files__.js";
import { Follow__ } from "./controllers/Follow__.js";
import { Goods__ } from "./controllers/Goods__.js";
import { GoodsOrder__ } from "./controllers/GoodsOrder__.js";
import { System__ } from "./controllers/System__.js";
import { Test2__, Test__ } from "./controllers/Test__.js";

// createEntitySql();

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

app.controllers(
  User__,
  Cashout__,
  Collect__,
  Comment__,
  Files__,
  Follow__,
  Goods__,
  GoodsOrder__,
  System__,
  Test__,
  Test2__
);

AppDataSource.initialize()
  .then(async () => {
    app.run();
  })
  .catch((error) => console.log(error));

/**
 * 解决端口占用
 *
 * # mac关闭端口进程
 * sudo lsof -i :端口号
 * sudo kill 进程ID
 */
