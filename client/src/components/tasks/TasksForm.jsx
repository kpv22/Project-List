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
    <form
      onSubmit={handleSubmit}
      className="max-w-full w-11/12 flex justify-between"
    >
      <div className="flex w-full">
        <input
          type="text"
          name="title"
          className="bg-zinc-900 text-white w-full p-2 rounded-lg mb-0 text-lg"
          placeholder="Add a Task"
          style={{ minWidth: 0 }}
        />
        <button
          className="bg-green-500 text-white px-3 py-2 rounded-lg text-lg ml-2 mb-2 hover:bg-green-400"
          style={{ height: "100%" }}
        >
          Add
        </button>
      </div>
    </form>
  );
}
