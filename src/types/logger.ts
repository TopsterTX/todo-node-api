export type Log<T> = {
  rid: string;
  url: string;
  code: number;
  method: string;
  body: T;
};
