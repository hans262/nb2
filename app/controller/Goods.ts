import {
  Controller,
  Context,
  Post,
  Get,
  Delete,
  Param,
} from "../../src/index.js";
import { querysql } from "../common/mysql.js";
import { jwtTokenVerify } from "../common/utils.js";

@Controller("goods")
export class Goods {
  @Get("edit:id")
  async getGoodsEdit(ctx: Context, @Param() params: any) {
    const token = await jwtTokenVerify(ctx);
    if (!token) {
      return ctx.statusCode(200).json({ code: 1400, err: "请登陆" });
    }
    try {
      const [ret] = await querysql<any[]>(`
        SELECT goods.* FROM goods
        WHERE goods.id = ${params.id}
      `);

      ctx.statusCode(200).json({ code: 1000, result: ret });
    } catch (err: any) {
      ctx.statusCode(200).json({ code: 400, err: err?.message });
    }
  }

  @Get("gid:id")
  async getGoodsDetail(ctx: Context, @Param() params: any) {
    const token = await jwtTokenVerify(ctx);
    try {
      const [ret] = await querysql<any[]>(`
        SELECT goods.*,
        user.name AS user_name,
        user.account AS user_account,
        user.avatar AS user_avatar,
        (SELECT COUNT(collect.id) FROM collect
        WHERE collect.gid = goods.id
        AND collect.type = 'like'
        ) as like_count,
        (SELECT collect.id FROM collect
        WHERE collect.gid = goods.id
        AND collect.type = 'like'
        AND collect.uid = ${token?.uid ?? -1}
        ) as liked_id,
        (SELECT collect.id FROM collect
        WHERE collect.gid = goods.id
        AND collect.type = 'collect'
        AND collect.uid = ${token?.uid ?? -1}
        ) as collected_id
        FROM goods
        LEFT JOIN user ON user.id = goods.uid
        WHERE goods.id = ${params.id}
      `).then((d) =>
        d.map(
          ({
            user_account: account,
            user_name: name,
            user_avatar: avatar,
            ...goods
          }) => ({
            ...goods,
            user: { account, name, avatar, id: goods.uid },
          })
        )
      );

      ret.locked = ret.plan === "free" ? false : true;

      //已经登录
      if (token && ret.plan === "buy") {
        //是自己
        if (token.uid === ret.uid) {
          ret.locked = false;
        } else {
          //不是自己
          let [order] = await querysql(`
            SELECT * FROM gorder
            WHERE uid = ${token.uid}
            AND gid = ${ret.id}
            AND status = 'paid'
          `);
          if (order) {
            ret.locked = false;
          }
        }
      }

      if (ret.locked) {
        delete ret.files;
      }

      ctx.statusCode(200).json({ code: 1000, result: ret });
    } catch (err: any) {
      ctx.statusCode(200).json({ code: 400, err: err?.message });
    }
  }

  @Get("buy")
  async getGoodsBuy(ctx: Context) {
    const { searchParams } = ctx.url;
    const page = Number(searchParams.get("page"));
    const page_size = Number(searchParams.get("page_size"));
    const uid = searchParams.get("uid");
    const token = await jwtTokenVerify(ctx);

    try {
      const count = await querysql(`
        SELECT COUNT(*) AS total
        FROM gorder
        WHERE gorder.uid = ${uid}
        AND gorder.status = 'paid'
      `);

      const ret = await querysql<any[]>(`
        SELECT goods.id, goods.title, goods.preview,
        COUNT(c1.id) AS like_count,
        c2.id AS liked_id,
        user.name AS user_name,
        user.account AS user_account,
        user.avatar AS user_avatar
        FROM gorder
        LEFT JOIN goods on goods.id = gorder.gid
        LEFT JOIN collect AS c1 ON c1.gid = goods.id
        AND c1.type = 'like'
        LEFT JOIN collect AS c2 ON c2.gid = goods.id
        AND c2.type = 'like'
        AND c2.uid = ${token?.uid ?? -1}
        LEFT JOIN user ON user.id = goods.uid
        WHERE gorder.uid = ${uid}
        and gorder.status = 'paid'
        GROUP BY gorder.id, c2.id
        ORDER BY gorder.create_at DESC
        LIMIT ${(page - 1) * page_size}, ${page_size}
      `).then((d) =>
        d.map(
          ({
            user_name: name,
            user_avatar: avatar,
            user_account: account,
            ...goods
          }) => ({
            ...goods,
            user: { account, name, avatar, id: goods.uid },
          })
        )
      );

      ctx.statusCode(200).json({
        code: 1000,
        result: ret,
        info: { page, page_size, total: count[0].total },
      });
    } catch (err: any) {
      ctx.statusCode(200).json({ code: 400, err: err?.message });
    }
  }

  @Get("collect")
  async getGoodsCollect(ctx: Context) {
    const { searchParams } = ctx.url;
    const page = Number(searchParams.get("page"));
    const page_size = Number(searchParams.get("page_size"));
    const uid = searchParams.get("uid");
    const token = await jwtTokenVerify(ctx);
    try {
      const count = await querysql(`
        SELECT COUNT(*) AS total
        FROM collect
        LEFT JOIN goods ON goods.id = collect.gid
        WHERE collect.uid = ${uid}
        AND collect.type = 'collect'
        AND goods.status = 'public';
      `);

      const ret = await querysql<any[]>(`
        SELECT goods.id, goods.title, goods.preview,
        COUNT(c1.id) AS like_count,
        c2.id AS liked_id,
        user.name AS user_name,
        user.account AS user_account,
        user.avatar AS user_avatar
        FROM collect
        LEFT JOIN goods on goods.id = collect.gid
        LEFT JOIN collect AS c1 ON c1.gid = goods.id
        AND c1.type = 'like'
        LEFT JOIN collect AS c2 ON c2.gid = goods.id
        AND c2.type = 'like'
        AND c2.uid = ${token?.uid ?? -1}
        LEFT JOIN user ON user.id = goods.uid
        WHERE collect.uid = ${uid} AND goods.status = 'public'
        AND collect.type = 'collect'
        GROUP BY collect.id, c2.id
        ORDER BY collect.create_at DESC
        LIMIT ${(page - 1) * page_size}, ${page_size}
      `).then((d) =>
        d.map(
          ({
            user_name: name,
            user_avatar: avatar,
            user_account: account,
            ...goods
          }) => ({
            ...goods,
            user: { account, name, avatar, id: goods.uid },
          })
        )
      );

      ctx.statusCode(200).json({
        code: 1000,
        result: ret,
        info: { page, page_size, total: count[0].total },
      });
    } catch (err: any) {
      ctx.statusCode(200).json({ code: 400, err: err?.message });
    }
  }

  @Get()
  async getGoods(ctx: Context) {
    const { searchParams } = ctx.url;
    const page = Number(searchParams.get("page"));
    const page_size = Number(searchParams.get("page_size"));
    let search = searchParams.get("search") || "";
    let uid = searchParams.get("uid");
    const token = await jwtTokenVerify(ctx);

    try {
      if (search) {
        //判断是不是username
        const [tmp] = await querysql(`
          SELECT * FROM user WHERE user.name = '${search}'
        `);
        if (tmp) {
          //只查询该用户的
          search = "";
          uid = tmp.id;
        }
      }

      const count = await querysql(`
        SELECT COUNT(*) AS total
        FROM goods
        WHERE goods.status = 'public'
        ${
          search
            ? `AND MATCH(goods.title, goods.intro) AGAINST('${search}' WITH QUERY EXPANSION)`
            : ""
        }
        ${uid ? "AND uid = " + uid : ""}
      `);

      const ret = await querysql<any[]>(`
        SELECT goods.id, goods.title, goods.preview,
        user.name AS user_name,
        user.account AS user_account,
        user.avatar AS user_avatar,
        COUNT(c1.id) AS like_count,
        c2.id AS liked_id
        FROM goods
        LEFT JOIN user ON user.id = goods.uid
        LEFT JOIN collect AS c1 ON c1.gid = goods.id AND c1.type = 'like'
        LEFT JOIN collect AS c2 ON c2.gid = goods.id AND c2.type = 'like'
        AND c2.uid = ${token?.uid ?? -1}
        WHERE goods.status = 'public'
        ${
          search
            ? `AND MATCH(goods.title, goods.intro) AGAINST('${search}' WITH QUERY EXPANSION)`
            : ""
        }
        ${uid ? `AND goods.uid = ${uid}` : ""}
        GROUP BY goods.id, c2.id
        ${search ? "" : "ORDER BY goods.create_at DESC"}
        LIMIT ${(page - 1) * page_size}, ${page_size}
      `).then((d) =>
        d.map(
          ({
            user_name: name,
            user_avatar: avatar,
            user_account: account,
            ...goods
          }) => ({
            ...goods,
            user: { account, name, avatar, id: goods.uid },
          })
        )
      );

      ctx.statusCode(200).json({
        code: 1000,
        result: ret,
        info: { page, page_size, total: count[0].total },
      });
    } catch (err: any) {
      ctx.statusCode(200).json({ code: 400, err: err?.message });
    }
  }

  @Delete("delete/:id")
  async deleteGoods(ctx: Context, @Param() params: any) {
    const token = await jwtTokenVerify(ctx);
    if (!token) {
      return ctx.statusCode(200).json({ code: 1400, err: "请登陆" });
    }
    try {
      //验证当前登录用户，是否是该商品的发布者
      const [ret] = await querysql<any[]>(`
        SELECT id, uid FROM goods
        WHERE goods.id = ${params.id}
      `);

      if (token.uid !== ret.uid) {
        ctx
          .statusCode(200)
          .json({ code: 400, err: "非法操作，你不是该商品的发布者" });
        return;
      }
      await querysql(`
        UPDATE goods SET
        status = 'delete'
        WHERE id = ${params.id}
      `);

      ctx.statusCode(200).json({ code: 1000, result: "删除成功" });
    } catch (err: any) {
      ctx.statusCode(200).json({ code: 400, err: err?.message });
    }
  }

  @Post("create")
  async createGoods(ctx: Context) {
    const token = await jwtTokenVerify(ctx);
    if (!token) {
      return ctx.statusCode(200).json({ code: 1400, err: "请登陆" });
    }

    const body = await ctx.getBodyData("json");
    const files = JSON.stringify(body.files);
    const tags = JSON.stringify(body.tags);
    const preview = JSON.stringify(body.preview);
    try {
      await querysql(`
        INSERT INTO goods SET
        uid = '${token.uid}',
        status = '${body.status}',
        files = '${files}',
        preview = '${preview}',
        tags = '${tags}',
        title = '${body.title}',
        intro = '${body.intro}',
        plan = '${body.plan}',
        price = ${body.price || 0.0}
      `);
      ctx.statusCode(200).json({ code: 1000, result: "创建成功" });
    } catch (err: any) {
      ctx.statusCode(200).json({ code: 400, err: err?.message });
    }
  }

  @Post("update")
  async updateGoods(ctx: Context) {
    const token = await jwtTokenVerify(ctx);
    if (!token) {
      return ctx.statusCode(200).json({ code: 1400, err: "请登陆" });
    }

    const body = await ctx.getBodyData("json");
    const files = JSON.stringify(body.files);
    const tags = JSON.stringify(body.tags);
    const preview = JSON.stringify(body.preview);

    try {
      //验证当前登录用户，是否是该商品的发布者
      const [ret] = await querysql<any[]>(`
        SELECT id, uid FROM goods
        WHERE goods.id = ${body.id}
      `);

      if (token.uid !== ret.uid) {
        ctx
          .statusCode(200)
          .json({ code: 400, err: "非法操作，你不是该商品的发布者" });
        return;
      }

      await querysql(`
        UPDATE goods SET
        status = '${body.status}',
        files = '${files}',
        preview = '${preview}',
        tags = '${tags}',
        title = '${body.title}',
        intro = '${body.intro}',
        plan = '${body.plan}',
        price = ${body.price || 0.0}
        WHERE id = ${body.id}
      `);

      ctx.statusCode(200).json({ code: 1000, result: "更新成功" });
    } catch (err: any) {
      ctx.statusCode(200).json({ code: 400, err: err?.message });
    }
  }
}
