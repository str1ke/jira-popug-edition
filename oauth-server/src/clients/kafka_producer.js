const { Kafka } = require("kafkajs");
const { v4: uuidv4 } = require("uuid");

const { validate: schemaValidate } = require("../../../common/events-schema-registry");

const clientId = "oauth-server";
const brokers = ["broker:9092"];

const kafka = new Kafka({ clientId, brokers });
const producer = kafka.producer();

const cudTopic = "UsersStream";

module.exports.connect = async () => {
  await producer.connect();
};

module.exports.disconnect = async () => {
  await producer.disconnect();
};

module.exports.emitUserCreated = async (user) => {
  const message = {
    eventId: uuidv4(),
    eventVersion: 1,
    eventName: "users/create",
    eventTime: (new Date()).toISOString(),
    producer: "oauth-server",
    data: {
      publicId: user.publicId,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    },
  };

  const [isValid, errors] = schemaValidate("users/create/v1", message);

  if (!isValid) {
    console.error(errors);
    throw new Error("Invalid message");
  }

  await producer.send({
    topic: cudTopic,
    messages: [{
      value: JSON.stringify(message),
    }],
  });
};
