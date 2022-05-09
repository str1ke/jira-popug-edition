const { Kafka } = require("kafkajs")

const clientId = "tasks-service"
const brokers = ["broker:9092"]

const kafka = new Kafka({ clientId, brokers })
const producer = kafka.producer()

const businessTopic = "Tasks";
const cudTopic = "TasksStream";

(async () => {
  await producer.connect();
})()

module.exports.connect = async () => {
  await producer.connect();
}

module.exports.disconnect = async () => {
  await producer.disconnect();
}

module.exports.sendTaskCreated = async (task) => {
  const businessMessage = { type: "Tasks.Created" };
  await producer.send({
    topic: businessTopic,
    messages: [{
      key: task.id,
      value: JSON.stringify(businessMessage)
    }],
  });

  const cudMessage = { type: "Tasks.Created", payload: task };
  await producer.send({
    topic: cudTopic,
    messages: [{
      key: task.id,
      value: JSON.stringify(cudMessage)
    }],
  });
};

module.exports.sendTaskAssigneeChanged = async ({ taskId, oldUserId, newUserId }) => {
  const businessMessage = { type: "Tasks.AssigneeChanged", payload: { taskId, oldUserId, newUserId } };
  await producer.send({
    topic: businessTopic,
    messages: [{
      key: taskId,
      value: JSON.stringify(businessMessage)
    }],
  });

  const cudMessage = { type: "Tasks.Updated", payload: { id: taskId, userId: newUserId } };
  await producer.send({
    topic: cudTopic,
    messages: [{
      key: taskId,
      value: JSON.stringify(cudMessage)
    }],
  });
};

module.exports.sendTaskCompleted = async ({ taskId, userId }) => {
  const businessMessage = { type: "Tasks.Completed", payload: { taskId, userId } };
  await producer.send({
    topic: businessTopic,
    messages: [{
      key: taskId,
      value: JSON.stringify(businessMessage)
    }],
  });

  const cudMessage = { type: "Tasks.Updated", payload: { id: taskId, state: "completed" } };
  await producer.send({
    topic: cudTopic,
    messages: [{
      key: taskId,
      value: JSON.stringify(cudMessage)
    }],
  });
};
