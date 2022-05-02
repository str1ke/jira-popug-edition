const db = require("../db");

module.exports = {
  all: () => db("tasks").select("tasks.*", "users.email as userEmail").join("users", "tasks.user_id", "users.id").orderBy("createdAt", "desc"),
  findBy: (where = {}) => db("tasks").where(where).orderBy("createdAt", "desc"),
  create: (attrs) => db("tasks").insert(attrs).returning("*"),
  update: (where, attrs) => db("tasks").where(where).update(attrs).returning("*"),
};
