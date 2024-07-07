import { Method, Middleware } from "./context.js";

interface Metadata {
  /**控制器对象上的path，必传参数 */
  cpath?: string;
  /**方法路径，可不传，默认值 = '' */
  mpath?: string;
  /**控制器对象名称 */
  constructorName: string;
  /**请求类型 */
  method?: Method;
  /**函数名称 */
  propertyKey: string | symbol;
  /**控制器对象实例，挂装饰器才会有 */
  instance?: any;
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
    metadatas.map((m) => {
      if (m.constructorName === constructor.name) {
        m.cpath = cpath;
        //添加controller实例
        m.instance = instance;
        return true;
      }
    });
  };
}

function createMethodDecorator(method: Method) {
  return (mpath: string = ""): MethodDecorator =>
    (target, propertyKey) => {
      const meta = metadatas.find((m) => {
        if (
          m.constructorName === target.constructor.name &&
          m.propertyKey === propertyKey
        ) {
          m.method = method;
          m.mpath = mpath;
          return true;
        }
      });

      if (!meta) {
        metadatas.push({
          method,
          mpath,
          propertyKey,
          constructorName: target.constructor.name,
        });
      }
    };
}

export const Get = createMethodDecorator("GET");
export const Post = createMethodDecorator("POST");
export const Put = createMethodDecorator("PUT");
export const Delete = createMethodDecorator("DELETE");

export function Off(tf?: Middleware): MethodDecorator {
  return (target, propertyKey) => {
    // console.log(tf);
    metadatas.find((m) => {
      if (
        m.constructorName === target.constructor.name &&
        m.propertyKey === propertyKey
      ) {
        m.tf = tf;
        return true;
      }
    });
  };
}
