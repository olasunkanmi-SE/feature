import * as express from "express";
import { ICreateUserFeatureDTO } from "../interface/create-user-feature.dto";
import { UserFeatureService } from "../services/user-feature";
import { RequestValidation } from "../utility/request-validator";

export class UserFeatureController {
  public path = "/feature";
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post(this.path, this.createUserFeature);
    this.router.get(this.path, this.getUserFeature);
  }

  public async createUserFeature(req: express.Request, res: express.Response) {
    try {
      const reqBody = req.body as ICreateUserFeatureDTO;
      const error = RequestValidation.validateCreateUserFeatureRequest(reqBody);
      if (Object.keys(JSON.parse(error)).length) {
        return res.status(400).json({ error: JSON.parse(error) });
      }
      const feature = await UserFeatureService.create(reqBody);
      feature ? res.status(200).json() : res.status(403).json();
      return;
    } catch (error) {
      throw new Error(error);
    }
  }

  public async getUserFeature(req: express.Request, res: express.Response) {
    try {
      const reqQuery = req.query as Partial<ICreateUserFeatureDTO>;
      const error = RequestValidation.validateUserFeatureRequest(reqQuery);
      if (Object.keys(JSON.parse(error)).length) {
        return res.status(400).json(JSON.parse(error));
      }
      const feature: any = await UserFeatureService.getUserFeature(reqQuery);
      console.log(feature);
      if (!feature) {
        return res.status(403).json();
      }
      return res.status(200).json({ canAccess: feature.enable });
    } catch (error) {
      console.log(error);
    }
  }
}
