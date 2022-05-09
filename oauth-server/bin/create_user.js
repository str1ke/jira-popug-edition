#!/usr/bin/env node

const db = require("../db");
const userDao = require("../src/dao/user");
const kafkaProducerClient = require("../src/clients/kafka_producer");

const [email, password, role] = process.argv.slice(2);

if (!email || !password || !role) {
  console.error(`usage: ${process.argv[1]} <email> <password> <role>`);
  process.exit(1);
}

(async () => {
  try {
    await kafkaProducerClient.connect();

    const [ user ] = await userDao.create({ email, password, role });
    await kafkaProducerClient.sendUserCreated(user);

    await kafkaProducerClient.disconnect();
    await db.destroy();

    console.log("created");
  } catch (e) {
    console.error("failed");
    console.error(e);
  }
})();