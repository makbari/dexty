import { classSignature, methodSignature } from './interfaces';

function Controller(prefix: string): ClassDecorator {
  return (target: any) => {
    let metadata = Reflect.getOwnMetadata(classSignature, target);
    if (!metadata) {
      metadata = {};
    }
    if (!metadata.path) {
      metadata.path = '';
    }
    metadata.path = prefix;
    Reflect.defineMetadata(classSignature, metadata, target);
    if (!Reflect.hasMetadata(methodSignature, target)) {
      Reflect.defineMetadata(methodSignature, [], target);
    }
  };
}

export default Controller;
