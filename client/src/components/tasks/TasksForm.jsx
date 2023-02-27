import { useMutation } from "@apollo/client";
import { CREATE_TASK } from "../../graphql/tasks";
import { useParams } from "react-router-dom";

export function TasksForm() {
  const params = useParams();
  const [createTask] = useMutation(CREATE_TASK, {
    refetchQueries: [`getProject`],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask({
      variables: {
        title: e.target.title.value,
        projectId: params.id,
      },
    });
    e.target.reset();
    e.target.title.focus();
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" />
      <button>Add</button>
    </form>
  );
}
