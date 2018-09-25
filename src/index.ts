const hasProxy = typeof Proxy !== 'undefined';

// https://jsperf.com/obj-vs-set/1
// https://jsperf.com/proxy-vs-decorator

export type WithKnownUsage<T> = {
  proxy: T,
  usage: Set<string>,
  usedKeys: Array<string>,
  resetUsage(): void;
};

function createWithProxy<T extends Object>(source: T): WithKnownUsage<T> {
  const usage = new Set<string>();
  const usedKeys: Array<string> = [];
  const proxy = new Proxy(source, {
    get(target: T, key: string) {
      if (!usage.has(key)) {
        usage.add(key);
        usedKeys.push(key);
      }
      return (target as any)[key];
    }
  });
  return {
    proxy,
    usage,
    usedKeys,
    resetUsage: () => {
      usage.clear();
      usedKeys.length = 0;
    }
  }
}

function createWithDecorator<T extends Object>(source: T): WithKnownUsage<T> {
  const proxy: T = {} as any;
  const usage = new Set();
  const usedKeys: Array<string> = [];

  Object.setPrototypeOf(proxy, Object.getPrototypeOf(source));

  Object
    .getOwnPropertyNames(source)
    .forEach(key => Object.defineProperty(proxy, key, {
      get: () => {
        if (!usage.has(key)) {
          usage.add(key);
          usedKeys.push(key);
        }
        return (source as any)[key];
      },
      enumerable: true
    }));

  return {
    proxy,
    usage,
    usedKeys,
    resetUsage: () => {
      usage.clear();
      usedKeys.length = 0;
    }
  }
}

export function withKnowUsage<T extends Object>(source: T): WithKnownUsage<T> {
  return hasProxy
    ? createWithProxy(source)
    : createWithDecorator(source)
}