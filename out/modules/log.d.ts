export interface Message {
    type: string;
    msg: string;
    pid?: number;
}
export declare function LOG(massage: Message): void;
export interface Action {
    type: string;
}
export declare function SEND(cmd: Action): void;
