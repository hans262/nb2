import { Controller, Context, Post, Get, Off } from "../../src/index.js";
import { ResBody, Token } from "../common/model.js";
import { querysql } from "../common/mysql.js";
import { getToken } from "../common/utils.js";
import { loginVerify } from "../middlewares/loginVerify.js";

@Controller("/follow")
export class Follow__ {
  @Get("/relation")
  async getFollowRelation(ctx: Context) {
    try {
      const token = await getToken(ctx);
      const to_uid = ctx.query.to_uid;

      let followed = false;

      if (token) {
        const [ret] = await querysql(`
          SELECT * FROM follow
          WHERE uid = ${token.uid}
          AND to_uid = '${to_uid}'
        `);
        if (ret) {
          followed = true;
        }
      }
      ctx.json<ResBody>({ code: 1000, result: followed });
    } catch (err: any) {
      ctx.json<ResBody>({ code: 400, msg: err?.message });
    }
  }

  @Off(loginVerify)
  @Post("/switch")
  async switchFollow(ctx: Context) {
    const token = ctx.custom.token as Token;

    try {
      const body = await ctx.body("json");

      if (token.uid === body.to_uid) {
        ctx.json<ResBody>({ code: 400, msg: "你不能关注自己" });
      }

      const [ret] = await querysql(`
        SELECT * FROM follow
        WHERE uid = ${token.uid}
        AND to_uid = '${body.to_uid}'
      `);

      let followed: boolean;

      if (ret) {
        //取消关注
        await querysql(`DELETE FROM follow WHERE id = ${ret.id}`);
        followed = false;
      } else {
        //关注
        await querysql<any>(`
          INSERT INTO follow SET
          uid = ${token.uid},
          to_uid = '${body.to_uid}'
        `);
        followed = true;
      }
      ctx.json<ResBody>({ code: 1000, result: followed });
    } catch (err: any) {
      ctx.json<ResBody>({ code: 400, msg: err?.message });
    }
  }
}
