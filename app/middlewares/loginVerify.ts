import { Middleware } from "../../src/index.js";
import { getToken } from "../common/utils.js";
import { ResBody } from "../common/model.js";

export const loginVerify: Middleware = async (ctx, next) => {
  const token = await getToken(ctx);
  //传递token
  ctx.custom.token = token;
  if (!token) {
    return ctx.json<ResBody>({ code: 1400, msg: "请重新登录" });
  }
  next();
};
