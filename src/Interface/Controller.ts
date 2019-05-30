import { Req } from "../Interface/Req";
import { ServerResponse } from "http";

export abstract class Controller {
  PATH: string
  GET?(req: Req, res: ServerResponse): void
  POST?(req: Req, res: ServerResponse): void
  PUT?(req: Req, res: ServerResponse): void
  DELETE?(req: Req, res: ServerResponse): void
}