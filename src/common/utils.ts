/**
 * buffer 分割
 * @param buffer 需要分割的buffer
 * @param spl
 */
export function bufferSplit(buffer: Buffer, spl: string): Buffer[] {
  const result: Buffer[] = [];
  let offset = 0,
    index = 0;
  while ((index = buffer.indexOf(spl, offset)) !== -1) {
    result.push(buffer.subarray(offset, index));
    offset = index + spl.length;
  }
  result.push(buffer.subarray(offset));
  return result.filter((b) => b.byteLength);
}
/**
 * const buffer = Buffer.from('\r\n大青蛙私たち\r\n一天の一夜他\r\n我看iirftgr\r\n')
 * const ret = bufferSplit(buffer, '\r\n')
 */

/**
 * 日志对象
 * 单例模式 Logger.self
 */
export class Logger {
  private constructor() {}
  private static _self?: Logger;
  static get self() {
    if (!this._self) {
      this._self = new Logger();
    }
    return this._self;
  }
  /**
   * 默认日志颜色
   */

  defaultLogStyles = {
    error: "\x1B[31m", // red
    info: "\x1B[32m", // green
    controller: "\x1B[34m", // blue
    system: "\x1B[33m", // yellow
    static: "\x1B[36m", //蓝绿

    black: "\x1B[30m", //black
    magenta: "\x1B[35m", //品红
    underline: "\x1B[4m", //下划线
    reset: "\x1B[0m", //重置颜色
  } as const;

  /**
   * 输出日志
   * @param opt
   */
  log(opt: {
    level: "error" | "info" | "controller" | "static" | "system";
    path: string; //路径
    msg?: string; //原因
  }) {
    const { level, path, msg } = opt;
    const date = this.getCurrentDateTime();
    let mq = `${date} ${process.pid} ${level}${" -> " + path}`;
    mq = msg ? mq + `\n${msg}` : mq;
    mq = this.defaultLogStyles[level] + mq + this.defaultLogStyles["reset"];
    console.log(mq);
  }

  getCurrentDateTime() {
    const d = new Date();
    return `${d.getFullYear()}-${
      d.getUTCMonth() + 1
    }-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  }
}

/**
 * 解析请求范围
 * 格式要求: Content-Range: bytes=start-end
 * 如果文件 bytelength=10， 全部范围: bytes=0-9 ，
 * bytes=x-x 表示第x字节的内容
 * bytes=0- 表示全部范围
 *
 * 不支持以下格式
 * Range: <unit>=<range-start>-<range-end>, <range-start>-<range-end>
 *
 * @param range
 * @param size 文件大小
 */
export function parseRange(
  range: string,
  size: number
): {
  start: number;
  end: number;
} | null {
  const matched = range.match(/^bytes=(\d+)-(\d*)$/);
  //格式不正确
  if (!matched) return null;

  const start = parseInt(matched[1]);

  //兼容bytes=0-，这种格式
  const end = matched[2] === "" ? size - 1 : parseInt(matched[2]);

  if (start >= 0 && start <= end && end < size) {
    //合理范围
    return { start, end };
  } else {
    //不存在的范围
    return null;
  }
}
