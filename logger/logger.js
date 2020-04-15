import {
  NODE_ENV,
  ERROR_FILENAME,
  INFO_FILENAME,
  LOGPATH
} from "../constants/constants";
import { existsSync, mkdirSync } from "fs";
import { transports, format, createLogger } from "winston";
import safeStringify from "fast-safe-stringify";
import { get } from "express-http-context";
const { combine, timestamp, printf } = format;

const createLoggerDirectory = () => {
  try {
    if (!existsSync(LOGPATH)) mkdirSync(LOGPATH);
  } catch (error) {
    console.log("Error while creating Log Directory -> ", error);
  }
};
createLoggerDirectory();

// Our Custom Format of Logging
const logCustomFormat = printf(
  ({ level, message, label, timestamp, stack, ...info }) => {
    const logContent = { timestamp, label, message };
    const requestId = get("requestId");
    const requestBody = get("requestBody");
    if (requestId) logContent.requestId = requestId;
    if (info) logContent.info = info;
    if (level === "error") {
      if (requestBody) logContent.requestBody = requestBody;
      if (stack) logContent.stack = stack;
    }
    return safeStringify(logContent);
  }
);

const logger = createLogger({
  format: combine(timestamp(), logCustomFormat),
  transports: [
    new transports.File({ filename: ERROR_FILENAME, level: "error" }),
    new transports.File({ filename: INFO_FILENAME, level: "info" })
  ]
});

if (NODE_ENV === "development") {
  logger.add(
    new transports.Console({
      format: combine(timestamp(), logCustomFormat)
    })
  );
}

export default logger;
