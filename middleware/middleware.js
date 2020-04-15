import logger from "../logger/logger";
import morgan from "morgan";
import uniqid from "uniqid";
import { urlencoded, json } from "express";
import { middleware, set } from "express-http-context";

const appMiddleware = app => {
  app.use(
    morgan((tokens, req, res) => {
      logger.info(
        [
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          tokens["response-time"](req, res),
          "ms"
        ].join(" ")
      );
    })
  );

  app.use(urlencoded({ limit: "256kb", extended: true }));
  app.use(json({ limit: "256kb" }));
  app.use(middleware);

  app.use((req, res, next) => {
    const { body } = req;
    set("requestId", uniqid());
    set("requestBody", body);
    next();
  });
};

export default appMiddleware;
