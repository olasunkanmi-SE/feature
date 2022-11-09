import { UserController } from "./controllers/user.controller";
import dotenv from "dotenv";
import { App } from "./app";
import { FeatureController } from "./controllers/feature.controller";
import { UserFeatureController } from "./controllers/user-feature.controller";
import { UserController } from "./controllers/user.controller";

dotenv.config();
const port = process.env.PORT;
const app = new App(
  [new UserFeatureController(), new UserController(), new FeatureController()],
  parseInt(port)
);

app.listen();
