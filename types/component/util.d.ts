export namespace Util {
  export type Prohibit<T extends object, NK extends keyof T> = { [P in Exclude<keyof T, NK>]: T[P] } & { [P in Extract<keyof T, NK>]?: never; };
  export type ValueElement<T extends string, U extends string, Cv extends string | undefined = never, Cn extends string | undefined = '値なし'> =
    { type: T; value: string; unit: U; condition?: Cv; } | { type: T; value: null; unit: U; condition: Cn; };

  export type TimeRefID<T extends object> = { refId: string } & T;
  export type Local<T extends object> = { name: string; } & T;

  export type Part<B extends object, L extends Local<B> = Local<B>, Be extends Becoming<B, L>[] | never = never> = {
    base: (B & { locals?: never; }) | ({ locals: L[]; } & { [K in keyof B]?: never; });
    becomings?: Be;
  };
  export type PartNoBase<B extends object, L extends Local<B> = Local<B>> =
    (B & { base?: never; }) |
    ({ base: { locals: L[]; } } & { [K in keyof B]?: never; });

  export type Becoming<B extends object, L extends Local<B> = Local<B>> = {
    timeModifier: string;
  } & ((B & { locals?: never; }) | ({ locals: L[]; } & { [K in keyof B]?: never; }));
}
