const { types } = require("pg");
const snakeCase = require("lodash/snakeCase");
const knex = require("knex");

const { DB } = require("../config");

const postProcessResponse = require("./post_process_response");

types.setTypeParser(types.builtins.INT8, (value) => {
  return parseInt(value, 10);
});

types.setTypeParser(types.builtins.NUMERIC, (value) => {
  return parseFloat(value);
});

const dbSettings = {
  asyncStackTraces: true,
  wrapIdentifier: ((value, origImpl) => {
    if (value === "*") {
      return value;
    }

    const newValue = value.split(".").map(snakeCase).join(".");

    return origImpl(newValue);
  }),
  postProcessResponse,
};

module.exports = knex({
  ...DB,
  ...dbSettings,
});
