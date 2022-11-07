import * as express from "express";

export class FeatureController {
  public path = "/feature";
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(this.path, this.getFeature);
  }

  public getFeature = (req: express.Request, res: express.Response) => {
    return res.send("Express + TypeScript Servers");
  };
}
