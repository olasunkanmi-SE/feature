import { HttpException } from "./../exception/exception";
import { HydratedDocument } from "mongoose";
import { Feature } from "../models";
import { IFeature } from "./../models/feature";

export class FeatureService {
  static async create(name: string) {
    const featureExists = await FeatureService.checkFeature(name);
    if (featureExists) {
      throw new HttpException(400, "Feature alrady exists");
    }

    const feature: HydratedDocument<IFeature> = new Feature({ name });
    const createFeature = await feature.save();
    return createFeature;
  }

  static async checkFeature(name: string): Promise<boolean> {
    const feature: HydratedDocument<IFeature> = await Feature.findOne({ name });
    return feature ? true : false;
  }
}
