import logger from "../logger/logger";

const parseJson = value => {
  let json = {};
  try {
    json = JSON.parse(value);
  } catch (error) {
    logger.error("Error in parseJson() -> ", error);
  }
  return json;
};

export { parseJson };
