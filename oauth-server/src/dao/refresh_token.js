const db = require("../../db");

module.exports = {
  findBy: (where = {}) => db("refresh_tokens").where(where),
  create: (attrs) => db("refresh_tokens").insert(attrs).returning("*"),
  delete: (where) => db("refresh_tokens").where(where).delete(),
};
