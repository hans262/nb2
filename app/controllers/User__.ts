import { Controller, Context, Get, Post, Off } from "../../src/index.js";
import jwt from "jsonwebtoken";
import { JWTExp, JWTSecretKey } from "../common/constant.js";
import { createRandomNumber } from "../common/utils.js";
import { AppDataSource } from "../data-source.js";
import { User } from "../entitys/User.js";
import { ResBody, Token } from "../common/model.js";
import { loginVerify } from "../middlewares/loginVerify.js";

@Controller("/user")
export class User__ {
  private userRepository = AppDataSource.getRepository(User);

  @Off(loginVerify)
  @Post("/info")
  async setInfo(ctx: Context) {
    const token = ctx.custom.token as Token;
    const body = await ctx.body("json");

    try {
      const user = await this.userRepository.findOneBy({ id: token.uid });

      user!.nickname = body.nickname;
      user!.intro = body.intro;
      user!.avatar = body.avatar;
      const saved = await this.userRepository.save(user!);

      ctx.json<ResBody>({ code: 1000, user: saved });
    } catch (err: any) {
      ctx.json<ResBody>({ code: 400, msg: err?.msg });
    }
  }

  @Get("/info")
  async getInfo(ctx: Context) {
    const { account } = ctx.query;
    //用account获取
    //一并返回登录用户该用户的关注情况
    if (account) {
      const user = await this.userRepository.findOneBy({ account });
      return ctx.json<ResBody>({ code: 1000, user });
    }

    loginVerify(ctx, async () => {
      const token = ctx.custom.token as Token;
      //这里要做数据筛选，排出这些值password, phone, create_at
      const user = await this.userRepository.findOneBy({ id: token.uid });
      ctx.json<ResBody>({ code: 1000, user });
    });
  }

  @Post("register")
  async register(ctx: Context) {
    const body = await ctx.body("json");

    try {
      //判重
      const user = await this.userRepository.findOneBy({ phone: body.phone });

      if (user) {
        return ctx.json<ResBody>({ code: 400, msg: "该账号已注册" });
      }

      // 生成account
      const account = createRandomNumber(6);
      // 默认昵称 = user[account]
      const defaultName = `user[${account}]`;

      const saved = await this.userRepository.save(
        await this.userRepository.create({
          nickname: defaultName,
          phone: body.phone,
          account: account.toString(),
          password: body.password,
        })
      );
      ctx.json<ResBody>({ code: 1000, msg: "注册成功", user: saved });
    } catch (err: any) {
      ctx.json<ResBody>({ code: 400, msg: err?.msg });
    }
  }

  @Post("login")
  async login(ctx: Context) {
    const body = await ctx.body("json");
    const user = await this.userRepository.findOneBy({ phone: body.phone });

    if (!user) {
      return ctx.json<ResBody>({ code: 400, msg: "账号不存在" });
    }

    if ((user.password = body.password)) {
      //签发token
      const token = jwt.sign(
        {
          uid: user.id,
          name: user.nickname,
          account: user.account,
          exp: Math.floor(Date.now() / 1000) + JWTExp,
        },
        JWTSecretKey
      );
      ctx.json<ResBody>({ code: 1000, msg: "登录成功", token, user });
    } else {
      ctx.json<ResBody>({ code: 400, msg: "密码错误" });
    }
  }
}
