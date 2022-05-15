#!/usr/bin/env node

const db = require("../db");

const kafkaProducer = require("../src/clients/kafka_producer");
const userDao = require("../src/dao/user");

const [email, password, role] = process.argv.slice(2);

if (!email || !password || !role) {
  console.error(`usage: ${process.argv[1]} <email> <password> <role>`);
  process.exit(1);
}

(async () => {
  try {
    await kafkaProducer.connect();

    const [user] = await userDao.create({ email, password, role });
    await kafkaProducer.emitUserCreated(user);

    console.log("created");
  } catch (e) {
    console.error("failed");
    console.error(e);
  } finally {
    await kafkaProducer.disconnect();
    await db.destroy();
  }
})();
