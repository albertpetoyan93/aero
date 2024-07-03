import "./pre-start"; // Must be the first import
import logger from "jet-logger";
import EnvVars from "@src/constants/EnvVars";
import server from "./server";
import { synchronizeDb } from "./util/migrate";

// **** Run **** //

const SERVER_START_MSG =
  "Express server started on port: " + EnvVars.Port.toString();

async function start() {
  try {
    await synchronizeDb();
    server.listen(EnvVars.Port, () => {
      logger.info(SERVER_START_MSG);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
