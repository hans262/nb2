import { Controller, Context, Get, Post } from "../../src/index.js";
import { querysql } from "../common/mysql.js";
import jwt from "jsonwebtoken";
import { JWTExp, JWTSecretKey } from "../common/constant.js";
import { createRandomNumber, jwtTokenVerify } from "../common/utils.js";

@Controller("/user")
export class User {
  @Post("/info")
  async setInfo(ctx: Context) {
    const body = await ctx.getBodyData("json");
    const token = await jwtTokenVerify(ctx);
    if (!token) {
      return ctx.statusCode(200).json({ code: 1400, err: "请登陆" });
    }

    try {
      await querysql(`
        UPDATE user SET
        name = '${body.name}',
        intro = ${body.intro === null ? "NULL" : `'${body.intro}'`},
        avatar = ${body.avatar === null ? "NULL" : `'${body.avatar}'`}
        WHERE id = ${token.uid}
      `);

      const [newInfo] = await querysql<any[]>(`
        SELECT user.* FROM user WHERE id = ${token.uid}
      `).then((d) => d.map(({ password, phone, create_at, ...nest }) => nest));

      ctx.statusCode(200).json({ code: 1000, result: newInfo });
    } catch (err: any) {
      ctx.statusCode(200).json({ code: 400, err: err?.message });
    }
  }

  @Get("/info")
  async getInfo(ctx: Context) {
    const account = ctx.url.searchParams.get("account");
    //用account获取
    //一并返回登录用户该用户的关注情况
    if (account) {
      const [ret] = await querysql<any[]>(`        
        SELECT user.id, user.name, user.account,
        user.avatar, user.intro
        FROM user
        WHERE user.account = '${account}'
      `);

      ctx.statusCode(200).json({ code: 1000, result: ret });
      return;
    }

    const token = await jwtTokenVerify(ctx);
    // 用token获取
    if (!token) {
      return ctx.statusCode(200).json({ code: 1400, err: "请登陆" });
    }

    const [ret] = await querysql<any[]>(`
      SELECT user.* FROM user
      WHERE id = ${token.uid}
    `).then((d) => d.map(({ password, phone, create_at, ...nest }) => nest));

    ctx.statusCode(200).json({ code: 1000, result: ret });
  }

  @Post("register")
  async register(ctx: Context) {
    const body = await ctx.getBodyData("json");

    try {
      //判重
      const [ret] = await querysql(`
        SELECT user.*
        FROM user
        WHERE user.phone = '${body.phone}'
      `);

      if (ret) {
        return ctx.statusCode(200).json({ code: 400, err: "该账号已注册" });
      }

      // 生成account
      const account = createRandomNumber(6);
      // 默认昵称 = user[account]
      const defaultName = `user[${account}]`;

      //注册
      await querysql(`
        INSERT INTO user SET
        name = '${defaultName}',
        phone = '${body.phone}',
        account = '${account}',
        password = '${body.password}'
      `);

      ctx.statusCode(200).json({ code: 1000, result: "注册成功" });
    } catch (err: any) {
      ctx.statusCode(200).json({ code: 400, err: err?.message });
    }
  }

  @Post("login")
  async login(ctx: Context) {
    const body = await ctx.getBodyData("json");

    const [user] = await querysql(`
      SELECT user.*
      FROM user
      WHERE phone = '${body.phone}'
    `);

    if (!user) {
      return ctx.statusCode(200).json({ code: 400, err: "账号不存在" });
    }

    const [ret] = await querysql(`
      SELECT user.*
      FROM user
      WHERE phone = '${body.phone}'
      AND password = '${body.password}'
    `);

    if (ret) {
      //签发token
      const token = jwt.sign(
        {
          uid: ret.id,
          name: ret.name,
          account: ret.account,
          exp: Math.floor(Date.now() / 1000) + JWTExp,
        },
        JWTSecretKey
      );
      ctx.statusCode(200).json({ code: 1000, result: { token } });
    } else {
      ctx.statusCode(200).json({ code: 400, err: "密码错误" });
    }
  }
}
