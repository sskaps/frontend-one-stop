// import {Component} from 'vue'
import 'reflect-metadata';
export function controller<T extends new (...args: any[]) => any>(target: T) {
  // console.log(target)
  // 函数拓展
  // target.prototype.getName = () => {
  //   console.log('getName')
  // }
  // 拓展，高端写法
  // return class extends target {
  //   getName() {
  //     console.log('getName')
  //   }
  // }
  for (let key in target.prototype) {
    const path: string = Reflect.getMetadata('path', target.prototype, key);
    const method: Methods = Reflect.getMetadata('method', target.prototype, key);
    const handler = target.prototype[key];
    if (path && method) {
      handler()
    }
  }
}

export enum Methods {
  get = 'get',
  post = 'post'
}

function getRequestDecorator(type: Methods) {
  return function(path: string) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
      // 原型属性，默认不可遍历
      descriptor.enumerable = true;
      Reflect.defineMetadata('path', path, target, key);
      Reflect.defineMetadata('method', type, target, key);
    };
  };
}

export const get = getRequestDecorator(Methods.get);
export const post = getRequestDecorator(Methods.post);

// export function controller1(root: string) {
//   return function(target: new (...args: any[]) => any) {
//     for (let key in target.prototype) {
//       const path: string = Reflect.getMetadata('path', target.prototype, key);
//       const method: Methods = Reflect.getMetadata('method', target.prototype, key);
//       const handler = target.prototype[key];
//       if (path && method) {}
//     }
//   };
// }

// @controller1('/api')
// class Test {
//   @get('/login')
//   login() {
//     console.log('login')
//   }
//
//   @post('/logout')
//   logout() {
//     console.log('logout')
//   }
// }
//
// const test = new Test()
// console.log(test.login())


// export function get(path: string) {
//   return function (target: any, key: string) {
//     Reflect.defineMetadata('path', path, target, key);
//     Reflect.defineMetadata('method', 'get', target, key);
//   }
// }
//
// export function post(path: string) {
//   return function (target: any, key: string) {
//     Reflect.defineMetadata('path', path, target, key);
//     Reflect.defineMetadata('method', 'post', target, key);
//   }
// }

export function tryCatch(target: any, key: string, descriptor: PropertyDescriptor) {
  // console.log(target)
  // descriptor.writable = false;
  const fn = descriptor.value;
  descriptor.value = function () {
    try {
      // @ts-ignore
      fn.call(this, ...arguments);
    } catch (e) {
      console.log(e.message);
    }
  };
}

export function catchError(msg: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value;
    descriptor.value = function () {
      try {
        // @ts-ignore
        fn.call(this, ...arguments);
      } catch (e) {
        console.log(msg);
      }
    };
  }
}

// function testDecorator() {
//   return function controller<T extends new (...args: any[]) => any>(constructor: T) {
//     return class extends constructor {
//       name = 'hello world'
//       getName() {
//         return this.name
//       }
//     }
//   }
//
// }
// const Test = testDecorator()(class {
//   name: string;
//   constructor(name: string) {
//     this.name = name
//   }
// });
//
// const test = new Test('abc');
// console.log(test.getName());
