import logger from "../logger/logger";

const axiosError = (errorMessage, error) => {
  const errorObject = {};
  // Error 😨
  if (error.response) {
    /*
     * The request was made and the server responded with a
     * status code that falls out of the range of 2xx
     */
    Object.assign(errorObject, {
      data: error.data,
      status: error.status,
      headers: error.headers
    });
  } else if (error.request && error.request.url) {
    /*
     * The request was made but no response was received, `error.request`
     * is an instance of XMLHttpRequest in the browser and an instance
     * of http.ClientRequest in Node.js
     */
    Object.assign(errorObject, {
      url: error.request.url,
      baseUrl: error.request.baseUrl,
      params: error.request.params,
      method: error.request.method
    });
  } else if (error.message) {
    // Something happened in setting up the request and triggered an Error
    Object.assign(errorObject, { message: error.message });
  } else {
    Object.assign(errorObject, { config: error.config });
  }
  logger.error(errorMessage, errorObject);
};

export default axiosError;
