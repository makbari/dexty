import 'reflect-metadata';
import dotenv from 'dotenv';
import Server from './core/Server';
import Controller from './core/Controller';
import { Get } from './core/restApi';

import { Request, Response } from 'express';
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
@Controller({
  baseURI: 'user',
  prefix: 'api',
  version: 'v1.0'
})
export class User {
  @Get('/users')
  public index(req: Request, res: Response) {
    req;
    return res.send('hello there!');
  }
}
app.addControllers([User]);
