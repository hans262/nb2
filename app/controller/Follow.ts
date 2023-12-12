import { Controller, Context, Post, Get } from "../../src/index.js";
import { querysql } from "../common/mysql.js";
import { jwtTokenVerify } from "../common/utils.js";

@Controller("/follow")
export class Follow {
  @Get("/relation")
  async getFollowRelation(ctx: Context) {
    try {
      const token = await jwtTokenVerify(ctx);
      const to_uid = ctx.url.searchParams.get("to_uid");

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
      ctx.statusCode(200).json({ code: 1000, result: followed });
    } catch (err: any) {
      ctx.statusCode(200).json({ code: 400, err: err?.message });
    }
  }

  @Post("/switch")
  async switchFollow(ctx: Context) {
    const token = await jwtTokenVerify(ctx);
    if (!token) {
      return ctx.statusCode(200).json({ code: 1400, err: "请登陆" });
    }

    try {
      const body = await ctx.getBodyData("json");

      if (token.uid === body.to_uid) {
        ctx.statusCode(200).json({ code: 400, err: "你不能关注自己" });
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
      ctx.statusCode(200).json({ code: 1000, result: followed });
    } catch (err: any) {
      ctx.statusCode(200).json({ code: 400, err: err?.message });
    }
  }
}
