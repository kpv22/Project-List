import { useMutation } from "@apollo/client";
import { CREATE_TASK } from "../../graphql/tasks";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function TasksForm() {
  const params = useParams();
  const [createTask, { loading }] = useMutation(CREATE_TASK, {
    refetchQueries: [`getProject`],
  });
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    try {
      if (!title.trim()) {
        e.target.reset();
        e.target.title.focus();
        throw new Error("Task cannot be empty");
      }
      if (title.length > 120) {
        throw new Error("Title cannot be longer than 120 characters");
      }
      await createTask({
        variables: {
          title,
          projectId: params.id,
          done: false,
        },
      });
      e.target.reset();
      e.target.title.focus();
    } catch (error) {
      setShowToast(true);
      toast.error(error.message, {
        position: "top-left",
        closeOnClick: true,
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-full w-11/12 flex justify-between mb-2"
      >
        <div className="flex w-full">
          <input
            type="text"
            name="title"
            className="bg-zinc-900 text-white w-full  p-2 rounded-lg mb-1 text-lg shadow-black shadow-lg"
            placeholder="Add a Task..."
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
      <ToastContainer />
    </div>
  );
}
