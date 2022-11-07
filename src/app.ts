import express from "express";
import * as bodyParser from "body-parser";
import { checkUrlParamsMiddleWare } from "./middlewares/url-params";
export class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: unknown, port: number) {
    this.app = express();
    this.port = port;
    this.initMiddleWares();
    this.initControllers(controllers);
  }

  private initMiddleWares() {
    this.app.use(bodyParser.json());
    this.app.use(checkUrlParamsMiddleWare);
  }

  private initControllers(controllers: any) {
    for (const controller of controllers) {
      this.app.use("/", controller.router);
    }
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(
        `⚡️[server]: Server s running on https://localhost:${this.port}`
      );
    });
  }
}
