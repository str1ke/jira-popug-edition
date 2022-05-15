const db = require("../db");

module.exports = {
  findBy: (where = {}) => db("users").where(where).orderBy("createdAt", "desc"),
  create: (attrs) => db("users").insert(attrs).returning("*"),
  update: (where, attrs) => db("users").where(where).update(attrs).returning("*"),
  pluck: async (column) => {
    const rows = await db("users").select(column);

    return rows.map(({ id }) => id);
  },
};
