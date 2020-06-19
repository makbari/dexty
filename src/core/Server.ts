import express from 'express';
import { Application } from 'express';
import { controllerOptions, RouteDefinition } from './interfaces';

class Server {
  private readonly _app: Application;
  public constructor() {
    this._app = express();
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
      this.addController(ctrl);
    }
  }
  public addController(controller: any): void {
    const instance = new controller();
    const prefix = Reflect.getMetadata(
      'prefix',
      controller
    ) as controllerOptions;
    const routes: Array<RouteDefinition> = Reflect.getMetadata(
      'routes',
      controller
    );
    routes.forEach((route) => {
      let path = '';
      if (typeof prefix === 'string') {
        path = prefix + route.path;
      } else {
        path = `/${prefix.prefix}/${prefix.version}/${prefix.baseURI}${route.path}`;
      }
      if (__DEV__) {
        console.log(path);
      }
      this.app[route.requestMethod](
        path,
        (req: express.Request, res: express.Response) => {
          instance[route.methodName](req, res);
        }
      );
    });
  }
}

export default Server;
