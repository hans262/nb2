/// <reference types="node" />
import { Req } from '../Interface/Req';
import { ServerResponse } from 'http';
export default class Restart {
    static PATH: string;
    GET(req: Req, res: ServerResponse): void;
}
