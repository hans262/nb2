/// <reference types="node" />
import { Req } from "../Interface/Req";
import { ServerResponse } from "http";
export default class TestPost {
    static PATH: string;
    POST(req: Req, res: ServerResponse): void;
}
