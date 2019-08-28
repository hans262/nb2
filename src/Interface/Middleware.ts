import { ServerResponse } from "http";
import { Req } from "../Interface/Req";

export interface Middleware {
  (req: Req, res: ServerResponse, next: () => void): void
}