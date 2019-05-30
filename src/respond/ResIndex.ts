import { statSync } from "fs";
import { ServerResponse } from "http";
import { join } from 'path';
import { INDEX_PAGE, ROOT } from "../conf";
import { Req } from "../Interface/Req";
import { ResVerify } from "./ResVerify";
import { ResNotFound } from "./ResNotFound";

export function ResIndex(req: Req, res: ServerResponse): void {
  const INDEX_PATH: string = join(ROOT, INDEX_PAGE)
  try {
    req.__stats = statSync(INDEX_PATH)
    req.__absolutePath = INDEX_PATH
    return ResVerify(req, res)
  } catch (err) {
    console.log(err)
    return ResNotFound(req, res)
  }
}