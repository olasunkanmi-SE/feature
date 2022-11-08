import * as express from "express";
import { ICreateUserFeatureDTO } from "../interface/create-user-feature.dto";
import { UserFeatureService } from "../services/user-feature";
import { RequestValidation } from "../utility/request-validator";

export class FeatureController {
  public path = "/feature";
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post(this.path, this.createUserFeature);
    this.router.get(this.path, this.getUserFeature);
  }

  public createUserFeature = (req: express.Request, res: express.Response) => {
    try {
      const reqBody = req.body as ICreateUserFeatureDTO;
      const error = RequestValidation.validateUserFeatureRequest(reqBody);
      if (error.length) {
        return res.status(400).json({ error: JSON.parse(error) });
      }
      const feature = UserFeatureService.create(reqBody);
      if (!feature) {
        return res.status(403);
      }
      return res.status(200);
    } catch (error) {
      throw new Error(error);
    }
  };

  public getUserFeature = (req: express.Request, res: express.Response) => {
    try {
      const reqQuery = req.query as Partial<ICreateUserFeatureDTO>;
      const error = RequestValidation.validateUserFeatureRequest(reqQuery);
      if (Object.keys(error)) {
        return res.status(400).json(error);
      }
      const feature: any = UserFeatureService.getUserFeature(reqQuery);
      if (!feature) {
        return res.status(403);
      }
      return res.status(200).json({ canAccess: feature.enable });
    } catch (error) {
      console.log(error);
    }
  };
}
