const db = require("../../db");

module.exports = {
  findBy: (where = {}) => db("clients").where(where),
  create: (attrs) => db("clients").insert(attrs).returning("*"),
  update: (where, attrs) => db("clients").where(where).update(attrs).returning("*"),
};
