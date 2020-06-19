import { RouteDefinition } from './interfaces';

export const Get = (path: string): MethodDecorator => {
  return (target, propertyKey: string | Symbol): void => {
    if (!Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }

    const routes = Reflect.getMetadata('routes', target.constructor) as Array<
      RouteDefinition
    >;

    routes.push({
      requestMethod: 'get',
      path,
      methodName: propertyKey as string
    });
    Reflect.defineMetadata('routes', routes, target.constructor);
  };
};
