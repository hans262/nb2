/**
 * Record ->
 * type Record<K extends string | number | symbol, T> = { [P in K]: T; }
 * 
 */

type T50 = Record<number | string, 'hello'>