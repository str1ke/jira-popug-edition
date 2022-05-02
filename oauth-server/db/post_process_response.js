const _ = require("lodash");
const camelCase = require("lodash/camelCase");

const rebuildObject = (o) => {
  return Object.keys(o).reduce((acc, key) => {
    const camelKey = key.split(".").map(camelCase).join(".");

    return _.set(acc, camelKey, o[key]);
  }, {});
};

module.exports = ((result) => {
  if (result === undefined) {
    return result;
  }

  if (Array.isArray(result)) {
    return result.map((row) => rebuildObject(row));
  }

  return rebuildObject(result);
});
