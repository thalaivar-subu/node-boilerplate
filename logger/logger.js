import {
  NODE_ENV,
  ERROR_FILENAME,
  INFO_FILENAME,
  LOGPATH,
} from "../constants/constants";
import { existsSync, mkdirSync } from "fs";
import { transports, format, createLogger } from "winston";
const { combine, timestamp, simple } = format;

const createLoggerDirectory = () => {
  try {
    if (!existsSync(LOGPATH)) mkdirSync(LOGPATH);
  } catch (error) {
    console.log("Error while creating Log Directory -> ", error);
  }
};
createLoggerDirectory();

const logger = createLogger({
  level: "info",
  format: combine(timestamp(), simple()),
  transports: [
    new transports.File({ filename: ERROR_FILENAME, level: "error" }),
    new transports.File({ filename: INFO_FILENAME, level: "info" }),
  ],
});

if (NODE_ENV === "development") {
  logger.add(
    new transports.Console({
      format: combine(timestamp(), simple()),
    })
  );
}

export default logger;
