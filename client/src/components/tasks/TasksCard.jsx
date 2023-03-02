import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_TASK, UPDATE_TASK } from "../../graphql/tasks";
import {
  AiOutlineDelete,
  AiOutlineCheck,
  AiOutlineEdit,
  AiOutlineClose,
} from "react-icons/ai";
import { BsCheck2All } from "react-icons/bs";
import { FiMoreHorizontal } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export function TasksCard({ task }) {
  const params = useParams();
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: ["getProject"],
  });
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [originalTitle, setOriginalTitle] = useState(task.title);
  const [showMore, setShowMore] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updateTask] = useMutation(UPDATE_TASK, {
    refetchQueries: ["getProject"],
  });
  const [keyCount, setKeyCount] = useState(0);

  useEffect(() => {
    setOriginalTitle(title);
  }, [title]);

  const handleEditClick = () => {
    setEditing(true);
    setOriginalTitle(title);
  };

  const handleCancelClick = () => {
    setEditing(false);
    setTitle(originalTitle);
    setUpdatedTitle(title); // agregar esta línea
    setShowMore(false);
    setKeyCount(keyCount + 1);
  };

  const handleSaveClick = () => {
    if (title !== updatedTitle) {
      updateTask({
        variables: { id: task._id, title: updatedTitle, projectId: params.id },
      });
      setTitle(updatedTitle);
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
    }
    setEditing(false);
    setShowMore(false);
  };

  const handleTitleChange = (e) => {
    setUpdatedTitle(e.target.innerText);
  };

  return (
    <div
      className={`bg-zinc-900 ${
        editing ? "bg-zinc-700 border border-white border-opacity-20" : ""
      } px-5 py-3 mb-2 flex justify-between rounded-lg`}
    >
      <div
        key={keyCount}
        className={`outline-none text-sm ${editing ? "bg-transparent" : ""}`}
        contentEditable={editing}
        suppressContentEditableWarning={true}
        onInput={handleTitleChange}
      >
        {title}
      </div>

      <div>
        {!editing && (
          <>
            <button className="mx-1 shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400">
              <AiOutlineCheck />
            </button>
            <button
              className="mx-1 shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={() => setShowMore(!showMore)}
            >
              <FiMoreHorizontal />
            </button>

            {showMore && (
              <>
                <button
                  className="mx-1 shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  onClick={handleEditClick}
                >
                  <AiOutlineEdit />
                </button>
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
              </>
            )}
          </>
        )}
        {editing && (
          <>
            <button
              className="mx-1 shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={handleSaveClick}
            >
              <BsCheck2All />
            </button>
            <button
              className="mx-1 shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={handleCancelClick}
            >
              <AiOutlineClose />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
