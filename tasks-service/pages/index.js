import Router from 'next/router'
import { useEffect } from "react";
import {useUser, useTasks, useLogin, useCreateTask, useCompleteTask, useReshuffleTasks} from '../lib/hooks'

export default function Index() {
  const [{ logout }] = useLogin();
  const [user, { loading: userLoading }] = useUser();
  const [tasks, { loading: tasksLoading }] = useTasks();
  const [{ createTask }] = useCreateTask();
  const [{ completeTask }] = useCompleteTask();
  const [{ reshuffleTasks }] = useReshuffleTasks();

  useEffect(() => {
    if (!userLoading && !user) {
      Router.replace('/api/auth/popug-sso');
    }
  }, [user, userLoading])

  if (userLoading || tasksLoading) {
    return <div>Loading...</div>
  }

  const logoutHandler = () => logout();
  const newTaskHandler = () => createTask();
  const completeTaskHandler = (id) => completeTask(id);
  const reshuffleHandler = () => reshuffleTasks();

  const newTasks = tasks.filter((task) => task.state === "new");
  const completedTasks = tasks.filter((task) => task.state === "completed");

  return (
    <div>
      <h1>Tasks</h1>
      <h2>User</h2>
      {user && (
        <>
          <p>User</p>
          <button onClick={logoutHandler}>Logout</button>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
      <h2>New Tasks</h2>
      <button onClick={newTaskHandler}>New task</button>
      {(user?.role === "admin") && <button onClick={reshuffleHandler}>Reshuffle</button>}
      {(newTasks.length === 0) && <div>empty</div>}
      <ul>
        {newTasks.map((task) => (
          <li key={task.id}>
            {task.title} assignee={task.userEmail} assignePrice={task.assignePrice || "tbd"} completePrice={task.completePrice || "tbd"} {(task.state === "new") && <button onClick={() => completeTaskHandler(task.id)}>complete</button>}
          </li>
        ))}
      </ul>
      <h2>Completed Tasks</h2>
      {(completedTasks.length === 0) && <div>empty</div>}
      <ul>
        {completedTasks.map((task) => (
          <li key={task.id}>
            {task.title} assignee={task.userEmail} assignePrice={task.assignePrice || "tbd"} completePrice={task.completePrice || "tbd"}
          </li>
        ))}
      </ul>
    </div>
  )
}
