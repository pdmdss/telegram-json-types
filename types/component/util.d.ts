export namespace Util {
  export type Prettify<T> = { [K in keyof T]: T[K] extends object ? Prettify<T[K]> : T[K]; } & unknown;

  export type Prohibit<T extends object, NK extends keyof T> = { [P in Exclude<keyof T, NK>]: T[P] } & { [P in Extract<keyof T, NK>]?: never; };
  export type ExclusiveOption<T extends object, K extends keyof T> = Prohibit<T, K> | Prohibit<T, Exclude<keyof T, K>>;
  export type ExclusiveUnion<O extends object, N extends object, B1 extends object = {}, B2 extends object = {}> =
    Prettify<B1 & B2 & (Prohibit<O & Omit<N, keyof O>, Exclude<keyof N, keyof O>> | Prohibit<N & Omit<O, keyof N>, Exclude<keyof O, keyof N>>)>;

  export type CodeNameComb<CN extends `${number}:${string}`> =
    CN extends `${infer C}:${infer N}` ? { code: C; name: N; } : never;

  export type AddProt<T extends object, A extends object> = Prettify<{ [P in Exclude<keyof T, keyof A>]: T[P] } & A>;

  export type ValueOrNone<B extends object, C extends string = '値なし'> = ExclusiveUnion<{ value: string; }, { value: null; condition: C; }, B>;

  export type TimeRefID<T extends object> = Prettify<{ refId: string } & T>;
  export type Local<T extends object> = Prettify<{ name: string; } & T>;
  export type Base<T extends object> = ExclusiveOption<T & { locals: Local<T>[]; }, 'locals'>;
  export type BaseLocalOnly<T extends Base<object>> = T extends { locals: Local<object>[] } ? T : never;
  export type Part<T extends Base<object>> = {
    base: T;
  }

}
