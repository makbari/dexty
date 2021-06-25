import { TClassDecorator, TType } from '@interfaces/di.types';

export const Service = (): TClassDecorator<TType<Object>> => {
  return (target: TType<Object>) => {
    console.log(typeof target);

    return target;
  };
};
