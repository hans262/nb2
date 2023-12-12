import { Controller, Context, Post } from "../../src/index.js";
import { querysql } from "../common/mysql.js";
import { jwtTokenVerify } from "../common/utils.js";

@Controller("/collect")
export class Collect {
  @Post("/switch")
  async switch(ctx: Context) {
    const token = await jwtTokenVerify(ctx);
    if (!token) {
      return ctx.statusCode(200).json({ code: 1400, err: "请登陆" });
    }
    try {
      const body = await ctx.getBodyData("json");

      const [ret] = await querysql(`
        SELECT * FROM collect
        WHERE uid = ${token.uid}
        AND type = '${body.type}'
        AND gid = ${body.gid}
      `);

      let insert_id = null;

      if (ret) {
        //取消
        await querysql(`DELETE FROM collect WHERE id = ${ret.id}`);
      } else {
        //新增
        const { insertId } = await querysql<any>(`
          INSERT INTO collect SET
          uid = ${token.uid},
          type = '${body.type}',
          gid = ${body.gid}
        `);
        insert_id = insertId;
      }
      ctx.statusCode(200).json({
        code: 1000,
        result: insert_id,
      });
    } catch (err: any) {
      ctx.statusCode(200).json({ code: 400, err: err?.message });
    }
  }
}
