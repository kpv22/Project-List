import { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_TASK, UPDATE_TASK } from "../../graphql/tasks";
import {
  AiOutlineDelete,
  AiOutlineCheck,
  AiOutlineEdit,
  AiOutlineClose,
} from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export function TasksCard({ task }) {
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: ["getProject"],
  });
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [updatedTitle, setUpdatedTitle] = useState(title); // new state to hold updated title
  const [updateTask] = useMutation(UPDATE_TASK, {
    refetchQueries: ["getProject"],
  });
  const params = useParams();

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);
    setTitle(task.title);
    setUpdatedTitle(title); // reset updated title state as well
  };

  const handleSaveClick = () => {
    updateTask({
      variables: { id: task._id, title: updatedTitle, projectId: params.id }, // update with new title
    });
    setTitle(updatedTitle); // set current title to new title
    setEditing(false);
    toast.success("Task updated successfully", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleTitleChange = (e) => {
    setUpdatedTitle(e.target.innerText); // update updated title state
  };

  return (
    <div className="bg-zinc-900 px-5 py-3 mb-2 flex justify-between rounded-lg">
      <div
        className={`outline-none text-sm ${editing ? "bg-transparent" : ""}`}
        contentEditable={editing}
        suppressContentEditableWarning={true}
        onInput={handleTitleChange}
        onBlur={handleSaveClick}
      >
        {title}
      </div>

      <div>
        {editing ? null : (
          <button className="mx-1 shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400">
            <AiOutlineCheck />
          </button>
        )}
        <button className="mx-1 shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400">
          <FiMoreHorizontal />
        </button>

        {editing ? (
          <>
            <button
              className="mx-1 shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={handleSaveClick}
            >
              <AiOutlineCheck />
            </button>
            <button
              className="mx-1 shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={handleCancelClick}
            >
              <AiOutlineClose />
            </button>
          </>
        ) : (
          <button
            className="mx-1 shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={handleEditClick}
          >
            <AiOutlineEdit />
          </button>
        )}

        <button
          className="mx-1 shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={() => {
            deleteTask({
              variables: { id: task._id },
            });
          }}
        >
          <AiOutlineDelete />
        </button>
      </div>
    </div>
  );
}
