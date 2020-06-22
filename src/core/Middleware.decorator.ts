import { classSignature } from './interfaces';
import { RequestHandler } from 'express';

function classMiddleware(middlewares: RequestHandler[]): ClassDecorator {
  return (target: any) => {
    let metadata = Reflect.getOwnMetadata(classSignature, target);
    if (!metadata) {
      metadata = {};
    }
    if (!metadata.middleware) {
      metadata.middlewares = [];
    }
    const _middlewares: RequestHandler[] = [].slice.call(metadata.middlewares);
    _middlewares.push(...middlewares);
    metadata.middlewares = _middlewares;
    Reflect.defineMetadata(classSignature, metadata, target);
  };
}

export default classMiddleware;
