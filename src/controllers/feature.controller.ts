import { FeatureService } from "./../services/feature";
import { RequestValidation } from "./../utility/request-validator";
import * as express from "express";
import { ICreateFeatureDTO } from "./../interface/create-feature.dto";
export class FeatureController {
  public path = "/feat";
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post(this.path, this.createFeature);
  }

  public createFeature = (req: express.Request, res: express.Response) => {
    try {
      const reqBody: ICreateFeatureDTO = req.body;
      const error = RequestValidation.validFeatureRequest(reqBody);
      if (Object.keys(error).length) {
        return res.status(400).json({ error });
      }
      const feature = FeatureService.create(reqBody.name);
      if (!feature) {
        return res.status(403);
      }
      return res.status(200);
    } catch (error) {
      throw new Error(error);
    }
  };
}
