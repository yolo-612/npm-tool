declare const __APP_INFO__: {
  pkg: {
    name: string;
    version: string;
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
  };
  buildTime: string;
};

interface AnyObject {
  [key: string]: unknown;
}

interface Options {
  value: unknown;
  label: string;
}

interface NodeOptions extends Options {
  children?: NodeOptions[];
}

type RecursiveRequired<T> = {
  [P in keyof T]-?: RecursiveRequired<T[P]>;
};

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

declare interface Window {
  __USER_DATA?: any;
}

/** 权益对外暴露的模块合集 */
declare module 'ces-gift-web/*'
