export interface SocketHeader {
  'Host'?: string
  'Connection'?: string
  'Pragma'?: string
  'Cache-Control'?: string
  'User-Agent'?: string
  'Upgrade'?: string
  'Origin'?: string
  'Sec-WebSocket-Version'?: string
  'Accept-Encoding'?: string
  'Accept-Language'?: string
  'Sec-WebSocket-Key'?: string
  'Sec-WebSocket-Extensions'?: string
}

export interface DataFrame {
  FIN: number
  Opcode: number
  Mask: number
  PayloadLength: number
  MaskingKey?: number[]
  PayloadData: string
}

/*
  GET / HTTP/1.1
  Host: 127.0.0.1:8888
  Connection: Upgrade
  Pragma: no-cache
  Cache-Control: no-cache
  User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36
  Upgrade: websocket
  Origin: file://
  Sec-WebSocket-Version: 13
  Accept-Encoding: gzip, deflate, br
  Accept-Language: zh-CN,zh;q=0.9
  Sec-WebSocket-Key: lchQ1h5pKNSSFrwlPzLG5Q==
  Sec-WebSocket-Extensions: permessage-deflate; client_max_window_bits
 */