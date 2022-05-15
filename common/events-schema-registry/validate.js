const path = require("path");

const Ajv = require("ajv/dist/2020");

const ajv = new Ajv();

const loadedSchemas = {};

function loadSchema(schemaPath) {
  let schema;

  try {
    schema = require(`./${schemaPath}`);
  } catch (error) {
    throw new Error(`cannot load schema: ${schemaPath}`);
  }

  const compiledSchema = ajv.compile(schema);

  return compiledSchema;
}

module.exports = function validate(eventName, data) {
  const schemaPath = path.join("schemas", `${eventName}.json`);

  const schemaValidate = loadedSchemas[schemaPath] || loadSchema(schemaPath);

  const valid = schemaValidate(data);

  return [valid, schemaValidate.errors];
};
