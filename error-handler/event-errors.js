import logger from "../logger/logger";

export default process
  .on("unhandledRejection", (reason, promise) => {
    console.error("Unhandle rejection in promise:: ", { reason, promise });
    logger.error("Unhandle rejection in promise:: ", { reason, promise });
  })
  .on("uncaughtException", (err, origin) => {
    console.error("Uncaught Exception thrown ", { err, origin });
    logger.error("Uncaught Exception thrown ", { err, origin });
  })
  .on("exit", code => {
    console.error(`About to exit with code ${code}`);
    logger.error("About to exit with code $", { code });
  });
