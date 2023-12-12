import jwt from "jsonwebtoken";
import { JWTSecretKey } from "./constant.js";
import { Context } from "../../src/index.js";

export interface JWTOpt {
  uid: number;
  name: string;
  account: string;
  exp: number;
}

/**
 * 验证登陆
 * @param ctx
 */
export function jwtTokenVerify(ctx: Context) {
  return new Promise<JWTOpt | undefined>((resolve) => {
    const token = ctx.req.headers["authorization"];
    if (!token) {
      return resolve(undefined);
    }

    try {
      const info = jwt.verify(token, JWTSecretKey) as JWTOpt;
      resolve(info);
    } catch (err) {
      resolve(undefined);
    }
  });
}

/**
 * 生成随机数字
 * 不包含0
 */
export function createRandomNumber(n: number) {
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const rets = [];
  for (let i = 0; i < n; i++) {
    nums.sort(() => 0.5 - Math.random());
    rets[i] = nums[Math.floor(Math.random() * 9)];
  }

  return Number(rets.join(""));
}
