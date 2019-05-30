import { statSync } from "fs";
import { ServerResponse } from "http";
import { join } from 'path';
import { INDEX_PAGE, ROOT } from "../conf";
import { Req } from "../Interface/Req";
import { ResVerify } from "./ResVerify";

export function ResIndex(req: Req, res: ServerResponse): void {
  req.__absolutePath = join(ROOT, INDEX_PAGE)
  req.__stats = statSync(req.__absolutePath)
  return ResVerify(req, res)
}