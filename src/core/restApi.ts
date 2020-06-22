import { methodSignature, RouteDefinition } from './interfaces';

export const Get = (path: string): MethodDecorator => {
  return (target, propertyKey: string | Symbol): void => {
    if (!Reflect.hasMetadata(methodSignature, target.constructor)) {
      Reflect.defineMetadata(methodSignature, [], target.constructor);
    }

    const routes = Reflect.getMetadata(
      methodSignature,
      target.constructor
    ) as Array<RouteDefinition>;

    routes.push({
      requestMethod: 'get',
      path,
      methodName: propertyKey as string
    });
    Reflect.defineMetadata(methodSignature, routes, target.constructor);
  };
};
