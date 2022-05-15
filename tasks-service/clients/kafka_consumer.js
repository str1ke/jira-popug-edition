const { Kafka } = require("kafkajs");

const userDao = require("../dao/user");

const clientId = "tasks-worker";
const brokers = ["broker:9092"];

const kafka = new Kafka({ clientId, brokers });
const consumer = kafka.consumer({ groupId: "tasks-worker" });

const cudTopic = "UsersStream";

module.exports.connect = async () => {
  await consumer.connect();
};

module.exports.disconnect = async () => {
  await consumer.disconnect();
};

module.exports.start = async () => {
  await consumer.subscribe({ topic: cudTopic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ _topic, _partition, message }) => {
      const { type, payload } = JSON.parse(message.value.toString());

      if (type === "Users.Created") {
        console.log();
        await userDao.create(payload);
      } else if (type === "Users.Updated") {
        await userDao.update({ id: payload.id }, payload);
      } else {
        throw new Error("unsupported type: ", type);
      }

      console.log(`processed id=${payload.id} email=${payload.email} role=${payload.role}`);
    },
  });
};
