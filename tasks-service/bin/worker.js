#!/usr/bin/env node

const kafkaConsumerClient = require("../clients/kafka_consumer");

(async () => {
  try {
    await kafkaConsumerClient.connect();
    await kafkaConsumerClient.start();
  } catch (error) {
    console.error(error);
  }
})();