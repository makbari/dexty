export type TClassDecorator<T> = (target: T) => void;

export interface TType<T> {
  new (...args: any[]): T;
}
