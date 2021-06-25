import { classSignature } from './interfaces';

function Controller(prefix: string): ClassDecorator {
  return <TFunction extends Function>(target: TFunction) => {
    let metadata = Reflect.getOwnMetadata(classSignature, target.prototype);
    if (!metadata) {
      metadata = {};
    }
    if (!metadata.path) {
      metadata.path = '';
    }
    metadata.path = prefix;
    Reflect.defineMetadata(classSignature, metadata, target.prototype);
  };
}

export default Controller;
