const { Kafka } = require("kafkajs")

const clientId = "oauth-server"
const brokers = ["broker:9092"]

const kafka = new Kafka({ clientId, brokers })
const producer = kafka.producer()

const businessTopic = "Users";
const cudTopic = "UsersStream";

module.exports.connect = async () => {
  await producer.connect();
}

module.exports.disconnect = async () => {
  await producer.disconnect();
}

module.exports.sendUserCreated = async (user) => {
  const businessMessage = { type: "Users.Created" };
  await producer.send({
    topic: businessTopic,
    messages: [{
      key: user.id,
      value: JSON.stringify(businessMessage)
    }],
  });

  const { password, ...userWoPass } = user;
  const cudMessage = { type: "Users.Created", payload: userWoPass };
  await producer.send({
    topic: cudTopic,
    messages: [{
      key: user.id,
      value: JSON.stringify(cudMessage)
    }],
  });
};
