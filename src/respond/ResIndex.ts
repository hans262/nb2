import { statSync, stat } from "fs";
import { join } from 'path';
import { INDEX_PAGE, ROOT } from "../configure";
import { Context } from "../Interface/Context";
import { ResVerify } from "./ResVerify";
import { ResNotFound } from "./ResNotFound";

export function ResIndex(ctx: Context) {
  const INDEX_PATH: string = join(ROOT, INDEX_PAGE)
  stat(INDEX_PATH, (_, stats) => {
    if (stats && stats.isFile()) {
      ctx.setStats(statSync(INDEX_PATH))
      ctx.setAbsolutePath(INDEX_PATH)
      return ResVerify(ctx)
    }
    return ResNotFound(ctx)
  })
}