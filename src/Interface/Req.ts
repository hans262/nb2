import { RequestOptions } from "https";
import { Stats } from "fs";

export interface Req extends RequestOptions {
  stats?: Stats
  relativePath?: string
}