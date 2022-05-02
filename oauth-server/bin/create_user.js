#!/usr/bin/env node

const db = require("../db");
const userDao = require("../src/dao/user");

const [email, password, role] = process.argv.slice(2);

if (!email || !password || !role) {
  console.error(`usage: ${process.argv[1]} <email> <password> <role>`);
  process.exit(1);
}

(async () => {
  try {
    await userDao.create({ email, password, role });
    await db.destroy();
    console.log("created");
  } catch (e) {
    console.log("failed");
    console.error(e);
  }
})();