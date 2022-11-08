import { FeatureService } from "./../services/feature";
import { RequestValidation } from "./../utility/request-validator";
import * as express from "express";
import { ICreateFeatureDTO } from "./../interface/create-feature.dto";
export class FeatureController {
  public path = "/feature";
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
      const error = RequestValidation.validRequest(reqBody);
      if (Object.keys(error)) {
        return res.status(400).json({ error });
      }
      const feature = FeatureService.create(reqBody.name);
      if (!feature) {
        return res.status(403).json("an error occured");
      }
      return res.status(200).json(feature);
    } catch (error) {
      throw new Error(error);
    }
  };
}
