import logger from "./logger/logger";
import { get } from "axios";

logger.info("Application has started Successfully");

get("https://searchconsole.googleapis.com/$discovery/rest?version=v1").then(
  (response) => {
    logger.info("Making Sample Get Call -> ", Object.keys(response));
  }
);

process
  .on("unhandledRejection", (reason, promise) => {
    console.error("Unhandle rejection in promise:: ", { reason, promise });
    logger.error("Unhandle rejection in promise:: ", { reason, promise });
  })
  .on("uncaughtException", (err, origin) => {
    console.error("Uncaught Exception thrown ", { err, origin });
    logger.error("Uncaught Exception thrown ", { err, origin });
  })
  .on("exit", (code) => {
    console.error(`About to exit with code ${code}`);
    logger.error("About to exit with code $", { code });
  });
