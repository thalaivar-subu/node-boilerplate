// eslint-disable-next-line no-unused-vars
import logEventErrors from "./error-handler/event-errors";
import logger from "./logger/logger";
import express from "express";
import { PORT } from "./constants/constants";
import appMiddleware from "./middleware/middleware";
// Starting Express Server
const app = express();

appMiddleware(app);

const server = app.listen(PORT, () => {
  const { address, port } = server.address();
  logger.info(`Server Listening at ${address} on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hi!!!");
});
