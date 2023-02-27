import { useMutation } from "@apollo/client";
import { DELETE_TASK } from "../../graphql/tasks";

export function TasksCard({ task }) {
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: ["getProject"],
  });
  return (
    <div>
      <h1>{task.title}</h1>
      <button
        onClick={() => {
          deleteTask({
            variables: { id: task._id },
          });
        }}
      >
        Delete
      </button>
    </div>
  );
}
