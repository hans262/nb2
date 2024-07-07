import {
  Controller,
  Context,
  Post,
  Get,
  Delete,
  Off,
} from "../../src/index.js";
import { ResBody, Token } from "../common/model.js";
import { querysql } from "../common/mysql.js";
import { getToken } from "../common/utils.js";
import { AppDataSource } from "../data-source.js";
import { Goods } from "../entitys/Goods.js";
import { User } from "../entitys/User.js";
import { loginVerify } from "../middlewares/loginVerify.js";

@Controller("goods")
export class Goods__ {
  private goodsRepository = AppDataSource.getRepository(Goods);
  private userRepository = AppDataSource.getRepository(User);

  @Off(loginVerify)
  @Get("edit:id")
  async getGoodsEdit(ctx: Context) {
    const { id } = ctx.params;
    try {
      const goods = await this.goodsRepository.findOneBy({ id });

      ctx.json<ResBody>({ code: 1000, goods });
    } catch (err: any) {
      ctx.json<ResBody>({ code: 400, msg: err?.message });
    }
  }

  @Off(loginVerify)
  @Get("gid:id")
  async getGoodsDetail(ctx: Context) {
    const token = ctx.custom.token as Token;
    const { id } = ctx.params;
    try {
      const goods = await this.goodsRepository.findOneBy({ id });

      ctx.json<ResBody>({ code: 1000, goods });
    } catch (err: any) {
      ctx.json<ResBody>({ code: 400, msg: err?.message });
    }
  }

  @Get("buy")
  async getGoodsBuy(ctx: Context) {
    let { page = 1, page_size = 10, uid } = ctx.query;
    page = Number(page);
    page_size = Number(page_size);

    const token = await getToken(ctx);

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

      ctx.json<ResBody>({
        code: 1000,
        result: ret,
        info: { page, page_size, total: count[0].total },
      });
    } catch (err: any) {
      ctx.json<ResBody>({ code: 400, msg: err?.message });
    }
  }

  @Get("collect")
  async getGoodsCollect(ctx: Context) {
    let { page = 1, page_size = 10, uid } = ctx.query;
    page = Number(page);
    page_size = Number(page_size);
    const token = await getToken(ctx);
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

      ctx.json<ResBody>({
        code: 1000,
        result: ret,
        info: { page, page_size, total: count[0].total },
      });
    } catch (err: any) {
      ctx.json<ResBody>({ code: 400, msg: err?.message });
    }
  }

  @Get()
  async getGoods(ctx: Context) {
    let { page = 1, page_size = 10, uid, search = "" } = ctx.query;
    page = Number(page);
    page_size = Number(page_size);
    const token = await getToken(ctx);

    try {
      let user = null;

      if (uid) {
        user = await this.userRepository.findOneBy({ id: uid });
      }

      const [goods, total] = await this.goodsRepository.findAndCount({
        where: {
          user: user!,
        },
        relations: ["user", "collects"],
        take: page_size,
        skip: (page - 1) * page_size,
        order: { create_at: "DESC" },
      });

      let result = goods.map(({ collects, ...rest }) => ({
        ...rest,
        like_count: collects.filter((c) => c.type === "like").length,
        liked_id:
          collects.find((c) => c.uid === token?.uid && c.type === "like")?.id ||
          null, //当前登录用户点赞id
        collected_id:
          collects.find((c) => c.uid === token?.uid && c.type === "collect")
            ?.id || null, //当前登录用户收藏id
      }));

      ctx.json<ResBody>({
        code: 1000,
        goods: result,
        info: { page, page_size, total },
      });
    } catch (err: any) {
      ctx.json<ResBody>({ code: 400, msg: err?.message });
    }
  }

  @Off(loginVerify)
  @Delete("delete/:id")
  async deleteGoods(ctx: Context) {
    const token = ctx.custom.token as Token;
    const { id } = ctx.params;
    try {
      const goods = await this.goodsRepository.findOneBy({ id });

      //验证当前登录用户，是否是该商品的发布者
      if (token.uid !== goods?.user.id) {
        ctx.json<ResBody>({ code: 400, msg: "非法操作，你不是该商品的发布者" });
        return;
      }
      const removed = await this.goodsRepository.remove(goods);

      ctx.json<ResBody>({ code: 1000, msg: "删除成功", goods: removed });
    } catch (err: any) {
      ctx.json<ResBody>({ code: 400, msg: err?.message });
    }
  }

  @Off(loginVerify)
  @Post("create")
  async createGoods(ctx: Context) {
    const token = ctx.custom.token as Token;
    const body = await ctx.body("json");
    try {
      const user = await this.userRepository.findOneBy({ id: token.uid });

      const goods = await this.goodsRepository.create({
        user: user!,
        status: body.status,
        files: body.files,
        preview: body.preview,
        tags: body.tags,
        title: body.title,
        intro: body.intro,
        plan: body.plan,
        price: body.price,
      });

      const saved = await this.goodsRepository.save(goods);

      ctx.json<ResBody>({ code: 1000, msg: "创建成功", goods: saved });
    } catch (err: any) {
      ctx.json<ResBody>({ code: 400, msg: err?.message });
    }
  }

  @Off(loginVerify)
  @Post("update")
  async updateGoods(ctx: Context) {
    const token = ctx.custom.token as Token;
    const body = await ctx.body("json");
    try {
      const goods = await this.goodsRepository.findOne({
        where: { id: body.id },
        relations: ["user"],
      });
      //验证当前登录用户，是否是该商品的发布者
      if (token.uid !== goods?.user.id) {
        ctx.json<ResBody>({ code: 400, msg: "非法操作，你不是该商品的发布者" });
        return;
      }

      const saved = await this.goodsRepository.save({
        ...goods,
        status: body.status,
        files: body.files,
        preview: body.preview,
        tags: body.tags,
        title: body.title,
        intro: body.intro,
        plan: body.plan,
        price: body.price,
      });

      ctx.json<ResBody>({ code: 1000, msg: "更新成功", goods: saved });
    } catch (err: any) {
      ctx.json<ResBody>({ code: 400, msg: err?.message });
    }
  }
}
