export type MessageType =
  'WORKER_STARTUP' |
  'WORKET_EXIT' |
  'MASTER_STARTUP' |
  'ERROR' |
  'REDIRECT' |
  'RES_CACHE' |
  'RES_ZIP' |
  'RES_416' |
  'RES_RANGE' |
  'RES_404' |
  'RES_FILE' |
  'RES_DIR' |
  'CONTROLLER'

export interface MESSAGE {
  type: MessageType
  msg: string
  pid?: number
}

export type ActionType = 'RE_START' | 'SHUT_DOWN'

export interface ACTION {
  type: ActionType
}