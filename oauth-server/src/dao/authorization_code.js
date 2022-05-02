const db = require("../../db");

module.exports = {
  findBy: (where = {}) => db("authorization_codes").where(where),
  create: (attrs) => db("authorization_codes").insert(attrs).returning("*"),
};
