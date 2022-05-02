const { DB } = require("./config");

module.exports = {
  ...DB,
  migrations: {
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};
