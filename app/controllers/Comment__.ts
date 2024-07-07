import { IsNull } from "typeorm";
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
import { AppDataSource } from "../data-source.js";
import { Comment } from "../entitys/Comment.js";
import { loginVerify } from "../middlewares/loginVerify.js";

@Controller("/comment")
export class Comment__ {
  private commentRepository = AppDataSource.getRepository(Comment);

  @Off(loginVerify)
  @Delete("delete/:id")
  async deleteComment(ctx: Context) {
    const { id } = ctx.params;
    try {
      await querysql(`DELETE FROM comment WHERE id=${id}`);
      ctx.json<ResBody>({ code: 1000, result: "删除成功" });
    } catch (err: any) {
      ctx.json<ResBody>({ code: 400, msg: err?.message });
    }
  }

  @Get()
  async getComment(ctx: Context) {
    let { page = 1, page_size = 10, gid } = ctx.query;
    page = Number(page);
    page_size = Number(page_size);

    try {
      const [parent_ret, total] = await this.commentRepository.findAndCount({
        where: {
          goods: { id: gid },
          parent_id: IsNull(),
        },
        relations: ["user"],
        order: { create_at: "DESC" },
        skip: (page - 1) * page_size,
        take: page_size,
      });

      const comments = await Promise.all(
        parent_ret.map(async (item) => {
          const child = await this.commentRepository.find({
            where: {
              parent_id: item.id,
              goods: { id: gid },
            },
            relations: ["user", "toUser"],
            order: { create_at: "DESC" },
          });
          return { ...item, child };
        })
      );

      ctx.json<ResBody>({
        code: 1000,
        result: comments,
        info: { page, page_size, total: total },
      });
    } catch (err: any) {
      ctx.json<ResBody>({ code: 400, msg: err?.message });
    }
  }

  @Off(loginVerify)
  @Post("/create")
  async create(ctx: Context) {
    const token = ctx.custom.token as Token;
    try {
      const body = await ctx.body("json");

      const comment = this.commentRepository.create({
        parent_id: body.parent_id,
        user: { id: token.uid },
        toUser: { id: body.to_uid },
        goods: { id: body.gid },
        content: body.content,
      });

      const saved = await this.commentRepository.save(comment);

      ctx.json<ResBody>({ code: 1000, msg: "评论成功", comment: saved });
    } catch (err: any) {
      ctx.json<ResBody>({ code: 400, msg: err?.message });
    }
  }
}
