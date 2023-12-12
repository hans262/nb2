import { Context, Middleware } from "../../src/index.js";
import jwt from "jsonwebtoken";
import { JWTSecretKey } from "../common/constant.js";

export const jwtVerify: Middleware = (ctx: Context, next) => {
  if (ctx.matchRoutes("api/auth/user_info")) {
    const token = ctx.req.headers["authorization"];
    // console.log(token)
    if (!token) {
      return ctx.statusCode(200).json({
        code: 1200,
        err: "请携带token再请求该接口",
      });
    }

    try {
      jwt.verify(token, JWTSecretKey);
    } catch (err) {
      return ctx.statusCode(200).json({ code: 1400, err });
    }
  }

  next();
};
