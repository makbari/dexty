export const classSignature: Symbol = Symbol('class_signatuer');
export const methodSignature: Symbol = Symbol('method_signature');
export const classMiddlewareSignature: Symbol = Symbol(
  'class_middleware_signature'
);
export interface RouteDefinition {
  path: string;
  requestMethod: 'get' | 'post' | 'delete' | 'options' | 'put';
  methodName: string;
  middlewares?: any[];
}
export interface routerConfig {
  baseURI: string;
  prefix: string;
  version: string;
}
