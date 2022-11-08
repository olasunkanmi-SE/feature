import express from "express";
import * as bodyParser from "body-parser";
import { checkUrlParamsMiddleWare } from "./middlewares/url-params";
import mongoose from "mongoose";
export class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: unknown, port: number) {
    this.app = express();
    this.port = port;
    this.connectDB();
    this.initMiddleWares();
    this.initControllers(controllers);
  }

  private connectDB() {
    const options = {
      autoIndex: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    };
    mongoose
      .connect(process.env.DBURL, options)
      .then(() => console.log("MongoDB connected successfully"))
      .catch((err) => console.log(err));
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
