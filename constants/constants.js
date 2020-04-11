import { dirname } from "path";

const APP_DIRECTORY = dirname(require.main.filename);
const NODE_ENV = process.NODE_ENV || "development";
const LOGPATH = process.LOGPATH || `${APP_DIRECTORY}`;
const ERROR_FILENAME = `${LOGPATH}/error.log`;
const INFO_FILENAME = `${LOGPATH}/info.log`;

export { NODE_ENV, LOGPATH, ERROR_FILENAME, INFO_FILENAME, APP_DIRECTORY };
