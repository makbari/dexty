export const classSignature: Symbol = Symbol('class_signatuer');
export interface RouteDefinition {
  path: string;
  requestMethod: 'get' | 'post' | 'delete' | 'options' | 'put';
  methodName: string;
}
export interface controllerOption {
  baseURI: string;
  prefix: string;
  version: string;
}
export type controllerOptions = string | controllerOption;
