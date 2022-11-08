import { UserFeatureService } from "./../services/feature";
import * as express from "express";
import { RequestValidation } from "../utility/request-validator";

export class FeatureController {
  public path = "/feature";
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post(this.path, this.createUserFeature);
  }

  public createUserFeature = (req: express.Request, res: express.Response) => {
    try {
      const reqBody = req.body as any;
      const error = RequestValidation.featureRequest(reqBody);
      if (error.length) {
        return res.status(400).json({ error: JSON.parse(error) });
      }
      const feature = UserFeatureService.create(reqBody);
      if (!feature) {
        return res.status(403);
      }
      return res.status(200);
    } catch (error) {
      console.log(error);
    }
  };

  public getFeature = (req: express.Request, res: express.Response) => {
    try {
      const reqQuery = req.query as any;
      const error = RequestValidation.featureRequest(reqQuery);
      if (error.length) {
        return res.status(400).json({ error: JSON.parse(error) });
      }
      const feature = UserFeatureService.create(reqQuery);
      if (!feature) {
        return res.status(403);
      }
      return res.status(200);
    } catch (error) {
      console.log(error);
    }
  };
}
