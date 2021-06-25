export const classSignature: Symbol = Symbol('class_signatuer');
export const methodSignature: Symbol = Symbol('method_signature');
export const classMiddlewareSignature: Symbol = Symbol(
  'class_middleware_signature'
);
export type httpMethods = 'get' | 'post' | 'delete' | 'options' | 'put';
export interface RouteDefinition {
  path: string;
  requestMethod: httpMethods;
  methodName: string;
  middlewares?: any[];
}
export interface routerConfig {
  baseURI: string;
  prefix: string;
  version: string;
}
