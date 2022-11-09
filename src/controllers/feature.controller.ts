import * as express from "express";
import { ICreateFeatureDTO } from "./../interface/create-feature.dto";
import { FeatureService } from "./../services/feature";
import { RequestValidation } from "./../utility/request-validator";
export class FeatureController {
  public path = "/feat";
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post(this.path, this.createFeature);
  }

  public async createFeature(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const reqBody: ICreateFeatureDTO = req.body;
      const error = RequestValidation.validFeatureRequest(reqBody);
      if (Object.keys(error).length) {
        return res.status(400).json({ error });
      }
      const feature = await FeatureService.create(reqBody.name);
      return res.status(200).json(feature);
    } catch (error) {
      next(error);
    }
  }
}
