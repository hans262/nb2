export interface ResBody {
  code: 1000 | 400 | 1400; // 1400 token过期
  msg?: string;
  [key: string]: any;
}

export interface Token {
  uid: string;
  name: string;
  account: string;
  exp: number;
}