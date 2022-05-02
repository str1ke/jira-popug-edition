const pino = require("pino");

const serializeLoggingContext = require("./serialize_logging_context");

const LOG_LEVEL = process.env.LOG_LEVEL || "info";

const errorSerializer = (error) => {
  const serializedError = {
    name: error.name,
    message: error.message,
    stacktrace: error.getStackTrace ? error.getStackTrace() : error.stack,
  };

  if (error.payload) {
    serializedError.payload = error.payload;
  }

  return serializedError;
};

const logger = pino({
  base: null,
  level: LOG_LEVEL,
  serializers: {
    error: errorSerializer,
  },
  hooks: {
    logMethod(inputArgs, method) {
      let [
        payload,
        msg = null,
        options = null,
      ] = inputArgs;

      if (typeof payload === "string" && msg === null && options === null) {
        msg = payload;
        payload = {};
      } else if (typeof payload === "string" && typeof msg === "object" && options === null) {
        options = msg;
        msg = payload;
        payload = {};
      } else if (typeof payload === "object" && typeof msg === "string" && options === null) {
        // all in right places
      } else if (typeof payload === "object" && typeof msg === "string" && typeof options === "object") {
        // all in right places
      } else {
        throw new Error("unsupported logging method execution");
      }

      if (options && options.include) {
        const messagePayload = serializeLoggingContext({
          ...this.bindings(),
          ...payload,
        }, options);

        msg = `${msg}: ${messagePayload}`;
      }

      return method.apply(this, [payload, msg]);
    },
  },
});

module.exports = logger;
