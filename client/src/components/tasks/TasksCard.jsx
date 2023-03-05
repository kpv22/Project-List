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
  const [isDone, setIsDone] = useState(task.done);
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
    try {
      if (title !== updatedTitle) {
        if (!updatedTitle.trim()) {
          // Agregar validación adicional
          throw new Error("Title cannot be empty");
        }
        updateTask({
          variables: {
            id: task._id,
            title: updatedTitle,
            projectId: params.id,
          },
        });
        setTitle(updatedTitle);
        toast.success("Successful upgrade", {
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
    } catch (error) {
      toast.error(`Error upgrading project: ${error.message}`, {
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
  };

  const handleTitleChange = (e) => {
    setUpdatedTitle(e.target.innerText);
  };

  const handleDone = async () => {
    try {
      const updatedTask = await updateTask({
        variables: {
          id: task._id,
          title: title,
          projectId: params.id,
          done: true,
        },
      });
      console.log("Task updated:", updatedTask);
      setIsDone(true);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(isDone);
  return (
    <div
      className={`bg-zinc-900 shadow-lg ${
        isDone
          ? "border-green-500 mb-2 text-gray-300 border-2 border-opacity-30"
          : "shadow-black"
      } ${
        editing ? "bg-zinc-600 border border-white border-opacity-60" : ""
      } px-5 py-3 mb-2 flex justify-between rounded-lg `}
    >
      <div
        key={keyCount}
        className={`outline-none text-sm ${editing ? "bg-transparent" : ""}`}
        contentEditable={editing}
        suppressContentEditableWarning={true}
        onInput={handleTitleChange}
        style={{
          overflowWrap: "break-word",
          maxHeight: "100px",
          overflowY: "auto",
        }}
      >
        {title}
      </div>

      <div>
        {!editing && (
          <>
            <button
              className={`mx-1 shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                isDone ? "hidden" : ""
              }`}
              onClick={handleDone}
              disabled={isDone}
            >
              <AiOutlineCheck />
            </button>
            <button
              className={`mx-1 shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                isDone ? "hidden" : ""
              }`}
              onClick={() => setShowMore(!showMore)}
            >
              <FiMoreHorizontal />
            </button>
            <button
              className={`mx-1 shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                isDone ? "" : "hidden"
              }`}
              onClick={() => {
                deleteTask({
                  variables: { id: task._id },
                });
              }}
            >
              <AiOutlineDelete />
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
