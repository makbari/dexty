import 'reflect-metadata';
import dotenv from 'dotenv';
import Server from './core/Server';
import Controller from './core/Controller';
import { Get } from './core/restApi';

import { Request, Response } from 'express';
import classMiddleware from './core/Middleware.decorator';
dotenv.config();
const port = process.env.PORT || 8080;

class SampleApp extends Server {
  public constructor() {
    super();
  }
}

const app = new SampleApp();

app.bootstrap(Number(port)).then(() => {
  console.log(`express is running on PORT ${port}`);
});
function middle(req: Request, res: Response, next: any) {
  res;
  req.body = 'Hello there!';
  next();
}
@Controller('/users')
@classMiddleware([middle])
export class User {
  @Get('/')
  public index(req: Request, res: Response) {
    return res.send(req.body);
  }
}
app.addControllers([User]);
