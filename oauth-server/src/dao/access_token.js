const db = require("../../db");

module.exports = {
  findBy: (where = {}) => db("access_tokens").where(where),
  create: (attrs) => db("access_tokens").insert(attrs).returning("*"),
  delete: (where) => db("access_tokens").delete(where),
};
