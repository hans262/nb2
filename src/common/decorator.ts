import { Method, Middleware } from "./model.js";

export interface Metadata {
  /**控制器path，必传，不挂载控制器，可能为undefined */
  cpath?: string;
  /**方法路径，可不传，默认值 = '' */
  mpath?: string;
  /**控制器对象名称 */
  constructorName: string;
  /**请求类型 */
  method?: Method;
  /**函数名称 */
  functionName: string | symbol;
  /**控制器对象实例，不挂载控制器，可能为undefined */
  instance?: any;
  /**api前缀 */
  apifix?: string;
  /**拦截函数 */
  tf?: Middleware;
}

/**
 * 元数据仓库
 */
export const metadatas: Metadata[] = [];

export function Controller(cpath: string): ClassDecorator {
  return (constructor: any) => {
    const instance = new constructor();
    for (let i = 0; i < metadatas.length; i++) {
      const item = metadatas[i];
      if (item.constructorName === constructor.name) {
        item.cpath = cpath;
        item.instance = instance;
        item.apifix = "/"; //给一个默认值
      }
    }
  };
}

function createMethodDecorator(method: Method) {
  return (mpath = ""): MethodDecorator =>
    (target, propertyKey) => {
      const meta = metadatas.find(
        (m) =>
          m.constructorName === target.constructor.name &&
          m.functionName === propertyKey
      );
      if (meta) {
        meta.method = method;
        meta.mpath = mpath;
      } else {
        metadatas.push({
          method,
          mpath,
          functionName: propertyKey,
          constructorName: target.constructor.name,
        });
      }
    };
}

export const Get = createMethodDecorator("GET");
export const Post = createMethodDecorator("POST");
export const Put = createMethodDecorator("PUT");
export const Delete = createMethodDecorator("DELETE");
export const Patch = createMethodDecorator("PATCH");

export function Off(tf?: Middleware): MethodDecorator {
  return (target, propertyKey) => {
    metadatas.find((m) => {
      if (
        m.constructorName === target.constructor.name &&
        m.functionName === propertyKey
      ) {
        m.tf = tf;
        return true;
      }
    });
  };
}
