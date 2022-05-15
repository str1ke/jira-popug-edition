const path = require("path");

const Ajv = require("ajv/dist/2020");

const ajv = new Ajv();

const loadedSchemas = {};

function loadSchema(path) {
  let schema;

  try {
    schema = require(`./${path}`);
  } catch (error) {
    throw new Error(`cannot load schema: ${path}`);
  }

  const compiledSchema = ajv.compile(schema);

  return compiledSchema;
}

module.exports = function validate(eventName, data) {
  const schemaPath = path.join("schemas", `${eventName}.json`);

  const schemaValidate = loadedSchemas[schemaPath] || loadSchema(schemaPath);

  const valid = schemaValidate(data);

  if (!valid) {
    throw new Error("data is not valid for schema");
  }

  return true;
};
