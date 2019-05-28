/// <reference types="node" />
import { ServerResponse } from 'http';
import { Req } from '../Interface/Req';
export default class ShutDown {
    static PATH: string;
    GET(req: Req, res: ServerResponse): void;
}
