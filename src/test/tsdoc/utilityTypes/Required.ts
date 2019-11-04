/**
 * Required ->
 * type Required<T> = { [P in keyof T]-?: T[P]; }
 * 映射必选
 */

namespace TestRequired {
  type T0 = {
    name?: string;
    age?: number;
    location: string
  }
  type T1 = Required<T0>
}
