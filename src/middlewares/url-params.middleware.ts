import { HttpException } from "./../exception/exception";
import { Request, Response, NextFunction } from "express";
export function checkUrlParamsMiddleWare(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const requestParams = request.query;
  if (Object.keys(requestParams).length) {
    if (!Object.hasOwnProperty.call(requestParams, "email")) {
      throw new HttpException(400, "email params is required");
    }
    if (!Object.hasOwnProperty.call(requestParams, "featureName")) {
      throw new HttpException(400, "featureName params is required");
    }
  }
  next();
}
