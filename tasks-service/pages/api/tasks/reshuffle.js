import taskDao from "../../../dao/task";
import userDao from "../../../dao/user";

export default async function userHandler(req, res) {
  const userIds = await userDao.pluck("id");
  const tasks = await taskDao.findBy({ state: "new" });

  for (const task of tasks) {
    const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
    await taskDao.update({ id: task.id }, { userId: randomUserId });
  }

  res.status(200).json();
}
