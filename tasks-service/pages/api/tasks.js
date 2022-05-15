import kafkaProducer from "../../clients/kafka_producer";
import taskDao from "../../dao/task";
import userDao from "../../dao/user";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      const tasks = await taskDao.all();
      res.status(200).json({ data: tasks });

      break;
    case "POST":
      const userIds = await userDao.pluck("id");
      const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];

      const newTask = await taskDao.create({ userId: randomUserId, title: `${Date.now()}`, state: "new" });

      await kafkaProducer.sendTaskCreated(newTask);

      res.status(201).json(newTask);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
