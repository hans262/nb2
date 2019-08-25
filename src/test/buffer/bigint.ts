/**
 * bigint ->
 * 存储超大型整数，64位整数
 * 末尾加n表示
 * 
 * number和bigint运算，需要都转成bigint再运算
 * 不然会丢失精度
 * 
 */

let big1: bigint =100n

//转化
let big2: bigint = BigInt(200)