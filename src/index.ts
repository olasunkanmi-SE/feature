import { UserController } from "./controllers/user.controller";
import dotenv from "dotenv";
import { App } from "./app";
import { FeatureController } from "./controllers/user-feature.controller";

dotenv.config();
const port = process.env.PORT;
const app = new App(
  [new FeatureController(), new UserController(), new FeatureController()],
  parseInt(port)
);

app.listen();
