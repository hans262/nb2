import { Pool } from 'mysql';
export declare const POOL: Pool;
export declare function QUERY<T>(sql: string): Promise<T>;
