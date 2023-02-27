import { TasksCard } from "./TasksCard";

export function TasksList({ tasks }) {
  return (
    <div>
      {tasks.map((task) => (
        <TasksCard task={task} key={task._id} />
      ))}
    </div>
  );
}
