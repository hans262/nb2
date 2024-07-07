import { Controller, Context, Post, Off } from "../../src/index.js";
import { ResBody, Token } from "../common/model.js";
import { querysql } from "../common/mysql.js";
import { createRandomNumber } from "../common/utils.js";
import { loginVerify } from "../middlewares/loginVerify.js";

@Controller("/order")
export class GoodsOrder__ {
  @Post("/paid")
  async paid(ctx: Context) {
    const body = await ctx.body("json");
    try {
      await querysql(`
        UPDATE gorder SET
        status = 'paid'
        WHERE id = ${body.order_id}
      `);
      ctx.json<ResBody>({ code: 1000, result: "支付成功" });
    } catch (err: any) {
      ctx.json<ResBody>({ code: 400, msg: err?.message });
    }
  }

  @Off(loginVerify)
  @Post("/create")
  async createOrder(ctx: Context) {
    const token = ctx.custom.token as Token;

    try {
      const body = await ctx.body("json");

      //检查是否有未支付的订单
      const [unpaid_order] = await querysql(`
        SELECT gorder.*
        FROM gorder
        WHERE uid = ${token.uid}
        AND gid = ${body.gid}
      `);

      if (unpaid_order) {
        return ctx.json<ResBody>({
          code: 1000,
          result: unpaid_order,
        });
      }

      //创建订单
      const insertRet = await querysql(`
        INSERT INTO gorder SET
        uid = ${token.uid},
        gid = ${body.gid},
        amount = ${body.amount},
        g_uid = ${body.g_uid},
        number = ${createRandomNumber(10)},
        status = 'unpaid'
      `);

      const [order_info] = await querysql(`
        SELECT gorder.*
        FROM gorder
        WHERE id = ${insertRet.insertId}
      `);

      ctx.json<ResBody>({
        code: 1000,
        result: order_info,
      });
    } catch (err: any) {
      ctx.json<ResBody>({ code: 400, msg: err?.message });
    }
  }
}
