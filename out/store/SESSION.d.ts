import { Session, SessionStore } from '../Interface/Session';
export declare const SESSION: SessionStore;
export declare const KEY: string;
export declare const EXPIRES: number;
export declare function generate(): Session;
export declare function reset(id: string): void;
export declare function remove(id: string): void;
export declare function select(id: string): Session;
