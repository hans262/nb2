import { Controller, Context, Post, Get } from "../../src/index.js";
import { querysql } from "../common/mysql.js";
import { jwtTokenVerify } from "../common/utils.js";

@Controller("/cashout")
export class Cashout {
  /**
   * 获取总收入
   */
  async getTotalIncome(uid: number): Promise<number> {
    const [ret] = await querysql(`
      SELECT gorder.g_uid AS uid,
      ROUND(SUM(gorder.amount), 2) AS income
      FROM gorder
      WHERE gorder.status = 'paid'
      AND gorder.g_uid = ${uid}
      GROUP BY gorder.g_uid;
    `);

    return ret?.income ?? 0;
  }

  /**
   * 获取当前已提现
   * 包含所有发起的提现金额总和
   * 不管提现状态如何
   */
  async getCashout(uid: number): Promise<number> {
    const [ret] = await querysql(`
      SELECT
      ROUND(SUM(cashout.amount), 2) AS amount
      FROM cashout
      WHERE cashout.uid = ${uid}
    `);
    return ret?.amount ?? 0;
  }

  @Post("/create")
  async createCashout(ctx: Context) {
    const token = await jwtTokenVerify(ctx);
    if (!token) {
      return ctx.statusCode(200).json({ code: 1400, err: "请登陆" });
    }

    try {
      const body = await ctx.getBodyData("json");
      const after_balance = body.pre_balance - body.amount;
      // 提现后余额 = 当前未提现 - 本次提现金额

      await querysql(`
        INSERT INTO cashout SET
        uid = ${token.uid},
        amount = ${body.amount},
        pre_balance = ${body.pre_balance},
        after_balance = ${after_balance},
        mark = '${body.mark || ""}'
      `);

      ctx.statusCode(200).json({
        code: 1000,
        result: "发起提现成功",
      });
    } catch (err: any) {
      ctx.statusCode(200).json({ code: 400, err: err?.message });
    }
  }

  @Get()
  async getCashoutList(ctx: Context) {
    const token = await jwtTokenVerify(ctx);
    if (!token) {
      return ctx.statusCode(200).json({ code: 1400, err: "请登陆" });
    }

    const { searchParams } = ctx.url;
    const page = Number(searchParams.get("page")) || 1;
    const page_size = Number(searchParams.get("page_size")) || 10;

    try {
      const count = await querysql(`
        SELECT COUNT(*) AS total
        FROM cashout
        WHERE cashout.uid = ${token.uid}
      `);

      const ret = await querysql(`
        SELECT * FROM cashout
        WHERE cashout.uid = ${token.uid}
        LIMIT ${(page - 1) * page_size}, ${page_size}
      `);

      ctx.statusCode(200).json({
        code: 1000,
        result: ret,
        info: { page, page_size, total: count[0].total },
      });
    } catch (err: any) {
      ctx.statusCode(200).json({ code: 400, err: err?.message });
    }
  }

  @Get("/stats")
  async getStats(ctx: Context) {
    const token = await jwtTokenVerify(ctx);
    if (!token) {
      return ctx.statusCode(200).json({ code: 1400, err: "请登陆" });
    }

    try {
      const income = await this.getTotalIncome(token.uid);
      // 当前未提现 = 总收入 - 已提现
      const cashout = await this.getCashout(token.uid);
      ctx.statusCode(200).json({
        code: 1000,
        result: { uid: token.uid, income, unCashout: income - cashout },
      });
    } catch (err: any) {
      ctx.statusCode(200).json({ code: 400, err: err?.message });
    }
  }
}
