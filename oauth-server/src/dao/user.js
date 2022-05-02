const db = require("../../db");

module.exports = {
  findBy: (where = {}) => db("users").where(where),
  create: (attrs) => db("users").insert(attrs).returning("*"),
  update: (where, attrs) => db("users").where(where).update(attrs).returning("*"),
};
