import taskDao from "../../../../dao/task";
import kafkaProducer from "../../../../clients/kafka_producer";

export default async function userHandler(req, res) {
  const { query: { id } } = req

  const task = await taskDao.findBy({ id }).first();

  if (!task) {
    return res.status(404).send();
  }

  const [ updatedTask ] = await taskDao.update({ id }, { state: "completed" });

  await kafkaProducer.sendTaskCompleted({
    taskId: task.id,
    userId: task.userId,
  });

  res.status(200).json(updatedTask);
}
