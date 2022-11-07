import dotenv from "dotenv";
import { App } from "./app";
import { FeatureController } from "./controllers/feature.controller";

dotenv.config();
const port = process.env.PORT;
const app = new App([new FeatureController()], parseInt(port));

app.listen();
