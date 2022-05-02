const _ = require("lodash");

const serializeValue = (value) => {
  if (Array.isArray(value)) {
    const serializedArray = value.map(serializeValue).join(",");

    return `[${serializedArray}]`;
  }

  if (_.isPlainObject(value)) {
    const serialized = Object.keys(value)
      .reduce((acc, key) => {
        acc[key] = serializeValue(value[key]);

        return acc;
      }, {});

    return JSON.stringify(serialized);
  }

  return value === undefined || value === null ? "" : `${value}`;
};

module.exports = function serializeLoggingContext(context, options = {}) {
  const {
    include = [],
  } = options;

  return include
    .reduce((acc, key) => {
      return [
        ...acc,
        `${key}=${serializeValue(_.get(context, key))}`,
      ];
    }, [])
    .join(" ");
};
