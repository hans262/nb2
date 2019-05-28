/// <reference types="node" />
import { ServerResponse } from 'http';
import { Req } from '../Interface/Req';
export default function Mount(req: Req, res: ServerResponse, next: Function): void;
