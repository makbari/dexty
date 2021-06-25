import 'reflect-metadata';
import { Request, Response } from 'express';
import Server from '../src/core/Server';
import Controller from '../src/core/Controller';
import { Get } from '../src/core/restApi';
import { Service } from '../src/dependency-injection/Service';

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

@Controller('/users')
export class User {
  @Get('/user')
  public index(req: Request, res: Response) {
    req;
    return res.send('Hello there');
  }
  public addUser(req: Request, res: Response) {
    req;
    return res.send('Wow, user is added');
  }
}
app.addControllers([User]);

@Service()
export class EX {
  constructor(name: string) {
    console.log(name);
  }
}
