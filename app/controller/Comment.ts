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

@Controller("/comment")
export class Comment {
  @Delete("delete/:id")
  async deleteComment(ctx: Context, @Param() params: any) {
    const token = await jwtTokenVerify(ctx);
    if (!token) {
      return ctx.statusCode(200).json({ code: 1400, err: "请登陆" });
    }
    try {
      await querysql(`DELETE FROM comment WHERE id=${params.id}`);
      ctx.statusCode(200).json({ code: 1000, result: "删除成功" });
    } catch (err: any) {
      ctx.statusCode(200).json({ code: 400, err: err?.message });
    }
  }

  @Get()
  async getComment(ctx: Context) {
    const { searchParams } = ctx.url;
    const page = Number(searchParams.get("page"));
    const page_size = Number(searchParams.get("page_size"));

    try {
      const count = await querysql(`
        SELECT COUNT(*) AS total
        FROM comment
        WHERE gid = ${searchParams.get("gid")}
        AND parent_id IS NULL
      `);

      const parent_ret = await querysql<any[]>(`
        SELECT comment.*,
        user.name AS user_name,
        user.account AS user_account,
        user.avatar AS user_avatar
        FROM comment
        LEFT JOIN user ON user.id = comment.uid
        WHERE comment.gid = ${searchParams.get("gid")}
        AND comment.parent_id IS NULL
        ORDER BY comment.create_at DESC
        LIMIT ${(page - 1) * page_size}, ${page_size}
      `).then((d) =>
        //解构字段
        d.map(
          ({
            user_name: name,
            user_avatar: avatar,
            user_account: account,
            ...comment
          }) => ({
            ...comment,
            user: { account, name, avatar, id: comment.uid },
          })
        )
      );

      const ret = await Promise.all(
        parent_ret.map(async (item) => {
          return {
            ...item,
            child: await querysql<any[]>(`
              SELECT comment.*,
              user.name AS user_name,
              user.account AS user_account,
              user.avatar AS user_avatar,
              to_user.name AS to_name
              FROM comment
              LEFT JOIN user ON user.id = comment.uid
              LEFT JOIN user AS to_user ON to_user.id = comment.to_uid
              WHERE comment.gid = ${item.gid}
              AND comment.parent_id = ${item.id}
              ORDER BY comment.create_at DESC
            `).then((d) =>
              d.map(
                ({
                  user_name: name,
                  user_avatar: avatar,
                  user_account: account,
                  ...comment
                }) => ({
                  ...comment,
                  user: { account, name, avatar, id: comment.uid },
                })
              )
            ),
          };
        })
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
  @Post("/create")
  async create(ctx: Context) {
    const token = await jwtTokenVerify(ctx);
    if (!token) {
      return ctx.statusCode(200).json({ code: 1400, err: "请登陆" });
    }
    try {
      const body = await ctx.getBodyData("json");
      //创建评论
      await querysql(`
        INSERT INTO comment SET
        parent_id = ${body.parent_id},
        uid = ${token.uid},
        to_uid = ${body.to_uid},
        gid = ${body.gid},
        content = '${body.content}'
      `);

      ctx.statusCode(200).json({ code: 1000, result: "评论成功" });
    } catch (err: any) {
      ctx.statusCode(200).json({ code: 400, err: err?.message });
    }
  }
}
