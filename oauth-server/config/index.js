require("dotenv").config();

const env = process.env.NODE_ENV || "development";

module.exports = {
  ENV: env,
  DB: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    pool: {
      min: 10,
      max: 50,
    },
    // debug
    debug: process.env.DB_DEBUG === "true",
    asyncStackTraces: process.env.DB_DEBUG === "true",
  },
  LOG_LEVEL: process.env.LOG_LEVEL,
};
