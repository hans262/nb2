import { statSync, stat } from "node:fs";
import { join } from 'node:path';
import { INDEX_PAGE, ROOT } from "../configure/index.js";
import { Context } from "../Interface/Context.js";
import { ResVerify } from "./ResVerify.js";
import { ResNotFound } from "./ResNotFound.js";

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