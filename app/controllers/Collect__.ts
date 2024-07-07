import { Controller, Context, Post, Off } from "../../src/index.js";
import { ResBody, Token } from "../common/model.js";
import { AppDataSource } from "../data-source.js";
import { Collect } from "../entitys/Collect.js";
import { loginVerify } from "../middlewares/loginVerify.js";

@Controller("/collect")
export class Collect__ {
  private collectRepository = AppDataSource.getRepository(Collect);

  @Off(loginVerify)
  @Post("/switch")
  async switch(ctx: Context) {
    const token = ctx.custom.token as Token;
    try {
      const body = await ctx.body("json");

      let collect = await this.collectRepository.findOneBy({
        uid: token.uid,
        type: body.type,
        goods: { id: body.gid },
      });
      let insert_id = null;

      if (collect) {
        await this.collectRepository.delete({ id: collect.id });
      } else {
        collect = await this.collectRepository.create({
          uid: token.uid,
          type: body.type,
          goods: { id: body.gid },
        });

        await this.collectRepository.save(collect);
        insert_id = collect.id;
      }

      ctx.json<ResBody>({ code: 1000, insert_id });
    } catch (err: any) {
      ctx.json<ResBody>({ code: 400, msg: err?.message });
    }
  }
}
