import { classSignature } from './interfaces';
import { RequestHandler } from 'express';

export function classMiddleware(middlewares: RequestHandler[]): ClassDecorator {
  return (target: any) => {
    registerMiddleware(target, classSignature, middlewares);
  };
}

export function Middleware(middlewares: RequestHandler[]): MethodDecorator {
  return (target: any, propertyKey: string | symbol) => {
    registerMiddleware(target, propertyKey, middlewares);
  };
}

export function registerMiddleware(
  target: any,
  signature: string | Symbol,
  middlewares: RequestHandler[]
): void {
  let metadata = Reflect.getOwnMetadata(signature, target);
  if (!metadata) {
    metadata = {};
  }
  if (!metadata.middleware) {
    metadata.middlewares = [];
  }
  const _middlewares: RequestHandler[] = [].slice.call(metadata.middlewares);
  _middlewares.push(...middlewares);
  metadata.middlewares = _middlewares;
  Reflect.defineMetadata(signature, metadata, target);
}
