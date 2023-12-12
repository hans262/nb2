import { Controller, Context, Post } from "../../src/index.js";
import { querysql } from "../common/mysql.js";
import { createRandomNumber, jwtTokenVerify } from "../common/utils.js";

@Controller("/order")
export class GoodsOrder {
  @Post("/paid")
  async paid(ctx: Context) {
    const body = await ctx.getBodyData("json");
    try {
      await querysql(`
        UPDATE gorder SET
        status = 'paid'
        WHERE id = ${body.order_id}
      `);
      ctx.statusCode(200).json({ code: 1000, result: "支付成功" });
    } catch (err: any) {
      ctx.statusCode(200).json({ code: 400, err: err?.message });
    }
  }

  @Post("/create")
  async createOrder(ctx: Context) {
    const token = await jwtTokenVerify(ctx);
    if (!token) {
      return ctx.statusCode(200).json({ code: 1400, err: "请登陆" });
    }
    try {
      const body = await ctx.getBodyData("json");

      //检查是否有未支付的订单
      const [unpaid_order] = await querysql(`
        SELECT gorder.*
        FROM gorder
        WHERE uid = ${token.uid}
        AND gid = ${body.gid}
      `);

      if (unpaid_order) {
        return ctx.statusCode(200).json({
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

      ctx.statusCode(200).json({
        code: 1000,
        result: order_info,
      });
    } catch (err: any) {
      ctx.statusCode(200).json({ code: 400, err: err?.message });
    }
  }
}
