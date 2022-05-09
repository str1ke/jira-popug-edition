import taskDao from "../../../dao/task";
import userDao from "../../../dao/user";
import kafkaProducer from "../../../clients/kafka_producer";

export default async function userHandler(req, res) {
  const userIds = await userDao.pluck("id");
  const tasks = await taskDao.findBy({ state: "new" });

  for (const task of tasks) {
    const newUserId = userIds[Math.floor(Math.random() * userIds.length)];
    await taskDao.update({ id: task.id }, { userId: newUserId });

    await kafkaProducer.sendTaskAssigneeChanged({
      taskId: task.id,
      oldUserId: task.userId,
      newUserId,
    });
  }

  res.status(200).json();
}
