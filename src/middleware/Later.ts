import { ServerResponse } from "http";
import { Middleware } from "../Interface/Middleware";
import { Req } from "../Interface/Req";
import { ResStatic } from "../respond/ResStatic";

export const Later: Middleware = function (req: Req, res: ServerResponse, next: Function): void {
  ResStatic(req, res)
}