import express from 'express';
import { Application, Router } from 'express';
import {
  classSignature,
  methodSignature,
  RouteDefinition,
  routerConfig
} from './interfaces';

class Server {
  private readonly _app: Application;
  public constructor(routerConfigs?: routerConfig) {
    this._app = express();
    routerConfigs;
  }
  public get app(): Application {
    return this._app;
  }
  public bootstrap(port: number): Promise<void> {
    return new Promise<void>((resolve) => {
      this._app.listen(port, resolve);
    });
  }
  public addControllers(controllers: any): void {
    for (const ctrl of controllers) {
      let routerLib = Router();
      const classMetadata = Reflect.getOwnMetadata(classSignature, ctrl);
      routerLib.use(classMetadata.middlewares);
      this.addController(ctrl, routerLib);
      this.app.use(classMetadata.path, routerLib);
    }
  }
  public addController(controller: any, routerLib: Router): void {
    const instance = new controller();

    const routes: Array<RouteDefinition> = Reflect.getMetadata(
      methodSignature,
      controller
    );
    for (const route of routes) {
      routerLib[route.requestMethod](route.path, instance[route.methodName]);
    }
  }
}

export default Server;
