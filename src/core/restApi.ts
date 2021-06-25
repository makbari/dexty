import { RouteDefinition } from './interfaces';

export const Get = (path: string): MethodDecorator => {
  return (target: Object, propertyKey: string | Symbol): void => {
    let routes = Reflect.getOwnMetadata(propertyKey, target) as RouteDefinition;
    if (!routes) {
      routes = Object.create({});
    }
    routes = {
      middlewares: [],
      requestMethod: 'get',
      path,
      methodName: propertyKey as string
    };
    Reflect.defineMetadata(propertyKey, routes, target);
  };
};

export const Post = (path: string): MethodDecorator => {
  return (target, propertyKey: string | Symbol): void => {
    if (!Reflect.hasMetadata(propertyKey, target)) {
      Reflect.defineMetadata(propertyKey, [], target);
    }
    let routes = Reflect.getOwnMetadata(propertyKey, target) as RouteDefinition;
    if (!routes) {
      routes = {
        requestMethod: 'post',
        path,
        methodName: propertyKey as string
      };
    } else {
      routes = Object.assign(routes, {
        requestMethod: 'post',
        path,
        methodName: propertyKey as string
      });
    }

    Reflect.defineMetadata(propertyKey, routes, target);
  };
};
