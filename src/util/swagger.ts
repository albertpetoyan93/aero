import "./../pre-start";
import { NodeEnvs } from "../constants/misc";
import EnvVars from "../constants/EnvVars";

const swaggerAutogen = require("swagger-autogen")({
  autoHeaders: true,
  autoQuery: true,
  autoBody: true,
  writeOutputFile: true,
});
const host =
  EnvVars.NodeEnv === NodeEnvs.Production.valueOf()
    ? "localhost:5000"
    : "localhost:5000";

const doc = {
  info: {
    version: "v1.0.0",
    title: "Aero",
    description: "Implementation of Swagger with TypeScript",
  },
  host: host,
  basePath: "/",
  securityDefinitions: {
    // securitySchemes: {
    //   bearerAuth: {
    //     type: "http",
    //     scheme: "bearer",
    //   },
    // },
    apiKey: {
      type: "apiKey",
      in: "header",
      name: "Authorization",
      description: "Some description...",
    },
  },
  tags: [],
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
};

const outputFile = "../view/swagger-output.json";
const endpointsFiles = ["./src/routes/index.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);
export default swaggerAutogen(outputFile, endpointsFiles, doc);
