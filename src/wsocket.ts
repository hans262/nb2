import { createHash } from "node:crypto";
import { createServer, Socket, Server } from "node:net";
import { bufferSplit } from "./common/utils.js";

export interface WebSocketOpt {
  port: number;
  host: string;
}

export class WebSocket {
  server: Server;
  /**客户端连接列表 */
  sockets = new Map<string, Socket>();
  /**连接名 */
  url: string;
  opt: WebSocketOpt;
  constructor(opt?: Partial<WebSocketOpt>) {
    this.opt = Object.assign({ port: 8888, host: "127.0.0.1" }, opt);
    this.url = `ws://${this.opt.host}:${this.opt.port}`;
    this.server = createServer();
    this.server.on("connection", (socket) => {
      socket.once("data", (data) => {
        this.socketOnce(socket, data);
      });
    });
  }

  /**
   * 数据传输
   * @param key
   * @param socket
   * @param data
   */
  onSocketData(key: string, socket: Socket, data: Buffer) {
    const frame = this.decodeDataFrame(data);
    // console.log(frame)
    // console.log(frame.PayloadData.slice(-10).toString())

    /**
     * 客户端端断开连接
     * 客户端主动出发ws.close()函数
     * 客户端关闭标签页，关闭浏览器
     */
    if (frame.Opcode === 0x8) {
      this.sockets.delete(key);
      socket.end();
      return;
    }

    // 二进制数据 ArrayBuffer
    if (frame.Opcode === 0x2) {
      // console.log(frame.PayloadData)
      return;
    }

    //数据延续
    if (frame.Opcode === 0x0) {
      // console.log(frame.PayloadData)
      return;
    }

    //协议规定收到ping响应pong，用于心跳检测
    if (frame.Opcode === 0x9) {
      socket.write(
        this.encodeDataFrame({
          FIN: 1,
          Opcode: 0xa,
          Mask: 0,
          PayloadData: Buffer.from("pong"),
        })
      );
      return;
    }

    // utf-8 文本数据
    if (frame.Opcode === 0x1) {
      //群发
      this.sockets.forEach((s) => s.write(this.encodeDataFrame(frame)));
      return;
    }
    console.log("未知码：", frame);
  }

  /**
   * 解析客户端header
   * @param data
   */
  parseClientHeader(data: Buffer) {
    const ret = bufferSplit(data, "\r\n");
    const header: SocketClientHeader = {};
    ret.slice(1).forEach((v) => {
      const tmp = bufferSplit(v, ": ");
      const [key, value] = tmp;
      if (!key || !value) return;
      header[key.toString() as keyof SocketClientHeader] = value.toString();
    });
    return header;
  }

  /**
   * 创建服务端header
   * @param SecWebSocketKey
   */
  createServerHeader(SecWebSocketKey: string) {
    //这个值是固定的
    const guid = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
    // 创建一个签名算法为sha1的哈希对象
    const hash = createHash("sha1");
    hash.update(SecWebSocketKey + guid);
    const SecWebsocketAccept = hash.digest("base64");
    const header = [
      "HTTP/1.1 101 Switching Protocols",
      "Upgrade: websocket",
      "Connection: Upgrade",
      "Sec-Websocket-Accept: " + SecWebsocketAccept + "\r\n\r\n",
    ];
    return header.join("\r\n");
  }

  /**
   * 处理客户端第一次消息
   * websocket连接过程
   * client -> 发起请求，携带请求头
   * server -> 验证websokcet请求头，然后回应响应头
   * client -> 收到响应头，验证，完成连接
   * @param socket
   * @param data
   */
  socketOnce(socket: Socket, data: Buffer) {
    const clientHeader = this.parseClientHeader(data);
    const SecWebSocketKey = clientHeader["Sec-WebSocket-Key"];
    if (
      clientHeader.Upgrade !== "websocket" ||
      clientHeader["Sec-WebSocket-Version"] !== "13" ||
      !SecWebSocketKey
    ) {
      return socket.end();
    }

    socket.write(this.createServerHeader(SecWebSocketKey));

    const socketKey = createHash("sha256")
      .update((Date.now() + Math.random()).toString())
      .digest("hex");

    this.sockets.set(socketKey, socket);

    socket.on("data", (data) => {
      this.onSocketData(socketKey, socket, data);
    });

    socket.on("end", () => {
      this.sockets.delete(socketKey);
      socket.destroy();
    });

    socket.on("error", (err) => {
      console.log(err);
    });
  }

  /**
   * 解码数据帧
   * data:Uint8Array
   * @param data
   */
  decodeDataFrame(data: Buffer): DataFrame {
    /**----------第1字节---------------- */
    let i = 0;
    //首位表示FIN，向右移动7位，得到首位值
    const FIN = (data[i] >> 7) as DataFrame["FIN"];
    //2、3、4位表示RSV
    const RSV = [
      (data[i] & 0b01000000) >> 6,
      (data[i] & 0b00100000) >> 5,
      (data[i] & 0b00010000) >> 4,
    ] as DataFrame["RSV"];
    //后四位表示Opcode
    const Opcode = (data[i] & 0b00001111) as DataFrame["Opcode"];

    /**----------第2字节---------------- */
    i = 1;
    //首位表示Mask
    const Mask = (data[i] >> 7) as DataFrame["Mask"];
    //后七位表示数据长度
    let PayloadLength = data[i] & 0b01111111;

    /**----------3-4/3-10---------------- */
    i = 2;
    if (PayloadLength === 126) {
      //第3、4个字节为数据真实长度，用16位无符号整数读取
      //16位就是上面2个字节
      //统一采用大端序读取
      PayloadLength = data.readUInt16BE(i);
      i += 2;
    } else if (PayloadLength === 127) {
      //真实长度大于65535
      //第3、4、5、6、7、8、9、10个字节为数据真实长度，用64位无符号整数读取
      //64位就是上面8个字节
      //注意超大数据，bigint 转的number
      PayloadLength = Number(data.readBigUInt64BE(i));
      i += 8;
    }

    /**----------后续---------------- */
    let PayloadData: Buffer, MaskingKey: DataFrame["MaskingKey"];
    //是否使用掩码
    if (Mask === 1) {
      //MaskingKey = 后续4个字节
      MaskingKey = [data[i], data[i + 1], data[i + 2], data[i + 3]];
      i += 4;
      // PayloadData = Buffer.allocUnsafe(Number(PayloadLength)) //使用不安全的内存分配，提升性能
      PayloadData = data.subarray(i);
      for (let j = 0; j < PayloadData.byteLength; j++) {
        //^ 数据和掩码做异或运算
        PayloadData[j] = PayloadData[j] ^ MaskingKey[j % 4];
      }
    } else {
      //否则直接截取数据
      PayloadData = data.subarray(i);
    }

    return { FIN, RSV, Opcode, Mask, MaskingKey, PayloadData };
  }

  /**
   * 编码数据帧
   * @param df
   */
  encodeDataFrame(df: DataFrame): Buffer {
    const p: number[] = [],
      d = df.PayloadData,
      len = d.byteLength;

    //填充第一个字节
    p.push((df.FIN << 7) + df.Opcode);
    //填充第二个字节，数据长度，不使用掩码
    if (len < 126) {
      p.push(len);
    } else if (len < 65536) {
      // 16位无符号整数
      p.push(126, len >> 8, len & 0b11111111);
    } else {
      // 64位无符号整数
      p.push(
        127,
        0,
        0,
        0,
        0,
        //前4位太大了，一般设置为0，也可设置为下面
        // (len & 0xFF00000000000000) >> 56,
        // (len & 0xFF000000000000) >> 48,
        // (len & 0xFF0000000000) >> 40,
        // (len & 0xFF00000000) >> 32,
        (len & 0xff000000) >> 24,
        (len & 0xff0000) >> 16,
        (len & 0xff00) >> 8,
        len & (0xff >> 0)
      );
    }
    //合并数据
    return Buffer.concat([Buffer.from(p), d]);
  }

  run() {
    this.server.listen(this.opt.port, this.opt.host, () => {
      console.log("websocket服务正在监听端口 -> " + this.url);
    });
  }
}

export interface SocketClientHeader {
  Host?: string;
  Connection?: string;
  Pragma?: string;
  "Cache-Control"?: string;
  "User-Agent"?: string;
  Upgrade?: string;
  Origin?: string;
  "Sec-WebSocket-Version"?: string;
  "Accept-Encoding"?: string;
  "Accept-Language"?: string;
  "Sec-WebSocket-Key"?: string;
  "Sec-WebSocket-Extensions"?: string;
}

export interface DataFrame {
  /**帧结束标志，1表示最后一帧，0表示后面还有数据 */
  FIN: 1 | 0;
  /**未知 */
  RSV?: [1 | 0, 1 | 0, 1 | 0];
  /** 0x0-0xF */
  Opcode: 0x0 | 0x1 | 0x2 | 0x8 | 0x9 | 0xa;
  /**掩码 1采用，0未采用*/
  Mask: 1 | 0;
  /**掩码密钥 */
  MaskingKey?: number[];
  /**数据实体 */
  PayloadData: Buffer;
}

/*
   0                   1                   2                   3
   0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
  +-+-+-+-+-------+-+-------------+-------------------------------+
  |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
  |I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
  |N|V|V|V|       |S|             |   (if payload len==126/127)   |
  | |1|2|3|       |K|             |                               |
  +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
  |     Extended payload length continued, if payload len == 127  |
  + - - - - - - - - - - - - - - - +-------------------------------+
  |                               |Masking-key, if MASK set to 1  |
  +-------------------------------+-------------------------------+
  | Masking-key (continued)       |          Payload Data         |
  +-------------------------------- - - - - - - - - - - - - - - - +
  :                     Payload Data continued ...                :
  + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
  |                     Payload Data continued ...                |
  +---------------------------------------------------------------+
 */

/*
  |Opcode  | Meaning                             | Reference  |
 -+--------+-------------------------------------+------------+
  | 0x0    | Continuation Frame                  | RFC 6455   | 数据延续
 -+--------+-------------------------------------+------------+
  | 0x1    | Text Frame                          | RFC 6455   | utf-8 文本
 -+--------+-------------------------------------+------------+
  | 0x2    | Binary Frame                        | RFC 6455   | 二进制数据
 -+--------+-------------------------------------+------------+
  | 0x3-7  | Reserved non-control Frame          | RFC 6455   | 预留
 -+--------+-------------------------------------+------------+
  | 0x8    | Connection Close Frame              | RFC 6455   | 连接关闭
 -+--------+-------------------------------------+------------+
  | 0x9    | Ping Frame                          | RFC 6455   |
 -+--------+-------------------------------------+------------+
  | 0xA    | Pong Frame                          | RFC 6455   |
 -+--------+-------------------------------------+------------+
  | 0xB-F  | Reserved control Frame              | RFC 6455   |
 -+--------+-------------------------------------+------------+
 */

/**
 * 数据帧解析规则
 *
 * 第一个字节
 * 0   = FIN
 * 1-3 = RSV 1-3
 * 4-7 = Opcode
 *
 * 第二个字节
 * 0   = Mask 掩码，是否加密数据
 * 1-7 = len
 * len < 126  数据长度 = len，< 126字节
 * len = 126  数据长度 = 后面二个字节表示的，16位无符号整数，<65535字节
 * len = 127  数据长度 = 后面八个字节表示的，64位无符号整数，<64位无符号整数所表示的最大数个字节
 *
 * Mask = 1
 * 后续四个字节 = Maskingkey 掩码实体
 *
 * 后续字节 = 数据实体
 * 有掩码的需要异或运算
 *
 */

/**
 * 位运算 ->
 *
 * >> 右移运算符
 * 11 >> 2   = 2
 * 0000 1011 => 0000 0010
 *
 * << 左移运算符
 * 3 << 2    = 12
 * 0000 0011 => 0000 1100
 *
 * ^ 异或运算符 -> 真真=假，真假=真，假假=假
 * 3 ^ 2 = 1
 * 00000011 ^ 00000010 = 00000001
 *
 * & 且运算符 -> 真真=真，真假=假，假假=假
 * 25 & 3 = 1
 * 00011001 & 00000011 = 00000001
 *
 * | 或运算符 -> 真真=真，真假=真，假假=假
 * 2 | 3 = 3
 * 00000010 ｜ 00000011 = 00000011
 *
 */
