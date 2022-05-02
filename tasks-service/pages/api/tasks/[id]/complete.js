import taskDao from "../../../../dao/task";

export default async function userHandler(req, res) {
  const { query: { id } } = req

  const task = await taskDao.findBy({ id }).first();

  if (!task) {
    return res.status(404).send();
  }

  const [ updatedTask ] = await taskDao.update({ id }, { state: "completed" });

  res.status(200).json(updatedTask);
}
