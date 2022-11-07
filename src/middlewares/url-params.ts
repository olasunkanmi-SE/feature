import { Request, Response, NextFunction } from "express";
export function checkUrlParamsMiddleWare(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const requestParams = request.query;
  if (Object.keys(requestParams).length) {
    if (!Object.hasOwnProperty.call(requestParams, "email")) {
      throw new Error("email params is required");
    }
    if (!Object.hasOwnProperty.call(requestParams, "featureName")) {
      throw new Error("featureName params is required");
    }
  }
  next();
}
