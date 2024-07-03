/**
 * Setup express server.
 */

import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import helmet from "helmet";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "@src/view/swagger-output.json";
import EnvVars from "@src/constants/EnvVars";
import { NodeEnvs } from "@src/constants/misc";
import indexRouter from "./routes/index";
import headers from "./middlwares/headers";
import isAuth from "./middlwares/isAuth";

// **** Variables **** //

const app = express();

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// **** Setup **** //

// Basic middleware

app.use(express.json());
app.use(headers);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(EnvVars.CookieProps.Secret));

// Authorization middleware
app.use(isAuth);

// Show routes called in console during development
if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
  app.use(morgan("dev"));
}

// Security
if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
  app.use(helmet());
}

app.use("/", indexRouter);

// Add error handler
app.use(
  (
    err: any,
    _: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ) => {
    res.status(err.status || 500).json({
      status: err.status || 500,
      message: err.message || "Server error",
    });
  },
);

// Set static directory (js and css).
const staticDir = path.join(__dirname, "public");
app.use(express.static(staticDir));

// **** Export default **** //
export default app;
