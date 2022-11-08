import * as express from "express";
import { UserService } from "../services/user";
import { RequestValidation } from "../utility/request-validator";
import { ICreateUserDTO } from "./../interface/create-user.dto";
export class UserController {
  public path = "/user";
  public router = express.Router();
  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post(this.path, this.createUser);
  }

  public createUser = (req: express.Request, res: express.Response) => {
    try {
      const reqBody = req.body as ICreateUserDTO;
      const error = RequestValidation.validRequest(reqBody);
      if (Object.keys(error)) {
        return res.status(400).json({ error });
      }
      const user = UserService.create(reqBody.email);
      if (!user) {
        return res.status(403).json("an error occured");
      }
      return res.status(200).json(user);
    } catch (error) {
      throw new Error(error);
    }
  };
}
