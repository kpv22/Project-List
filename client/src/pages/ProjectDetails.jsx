import { useParams, Link, useNavigate } from "react-router-dom";

import { notFound } from "../components/NotFound/notFound";
import { useQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { BsCheck2All } from "react-icons/bs";
import {
  DELETED_PROJECT,
  GET_PROJECT,
  UPDATED_PROJECT,
} from "../graphql/projects";
import { TasksList } from "../components/tasks/TasksList";
import { TasksForm } from "../components/tasks/TasksForm";
import { Loading } from "../components/Loading/Loading";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { AiOutlineEdit, AiOutlineClose } from "react-icons/ai";
import { useApolloClient } from "@apollo/client";

export function ProjectDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [keyCount, setKeyCount] = useState(0);
  const client = useApolloClient();
  ///////////////////////////////////////////
  const [newInfo, setNewInfo] = useState({
    variables: {
      id: "",
      name: "",
      description: "",
    },
  });

  const handleEditClick = () => {
    setEditing(true);
    setNewInfo({
      variables: {
        id: data.project._id,
        name: data.project.name,
        description: data.project.description,
      },
    });
  };

  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: {
      id: params.id,
    },
  });
  const [updateProject] = useMutation(UPDATED_PROJECT, {
    refetchQueries: ["getProject", "getProjects"],
  });

  const [deleteProject] = useMutation(DELETED_PROJECT, {
    refetchQueries: ["getProjects"],
    onCompleted: () => {
      client.resetStore();
      navigate("/projects");
    },
  });

  const handleDeleteProject = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#30d664",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#191919",
      color: "white",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProject({
          variables: { id: data.project._id },
        });
      }
    });
  };

  const handleCancelClick = () => {
    setEditing(false);
    setKeyCount(keyCount + 1);
  };

  const handleSaveClick = () => {
    try {
      if (!newInfo.variables.name.trim()) {
        throw new Error("Title field is required");
      }
      if (
        data.project.name !== newInfo.variables.name ||
        data.project.description !== newInfo.variables.description
      ) {
        updateProject({
          variables: newInfo.variables,
        });
        toast.success("Successful Upgrade!", {
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

  const handleChange = (event) => {
    const name = event.target.dataset.name; // <--- obtenemos el nombre personalizado
    const value = event.target.innerText;
    setNewInfo((prevInfo) => {
      return {
        variables: {
          ...prevInfo.variables,
          [name]: value,
        },
      };
    });
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  if (error) return <p>{error.message}</p>;
  if (!data || !data.project || !data.project.name) {
    return (
      <div>
        {" "}
        <notFound />{" "}
      </div>
    );
  }
  return (
    <div style={{ width: "80%" }}>
      <div className="flex justify-between mb-2">
        <Link to="/projects">
          <button className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-400">
            Back
          </button>
        </Link>
        <button
          className="bg-red-500 px-3 py-2 rounded-lg hover:bg-red-400"
          onClick={handleDeleteProject}
        >
          Delete
        </button>
      </div>

      <div
        className={`bg-zinc-900 ${
          editing ? "bg-zinc-700 border border-white border-opacity-20" : ""
        }mb-2 p-5 flex justify-between w-full rounded-lg h-50`}
      >
        <div>
          <h1 className="text-gray-500">Title</h1>
          <p
            className={`outline-none text-sm ${
              editing ? "bg-transparent" : ""
            }`}
            data-name="name"
            contentEditable={editing}
            suppressContentEditableWarning={true}
            onInput={handleChange}
            key={keyCount + 1}
          >
            {data.project.name}
          </p>
          <h1 className="text-gray-500">Description</h1>
          <p
            className={`outline-none text-sm ${
              editing ? "bg-transparent" : ""
            }`}
            data-name="description"
            contentEditable={editing}
            suppressContentEditableWarning={true}
            onInput={handleChange}
            key={keyCount}
          >
            {data.project.description}
          </p>
        </div>
        <div>
          {!editing && (
            <button
              class="ml-auto mb-auto p-2 rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={handleEditClick}
            >
              <AiOutlineEdit />
            </button>
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

      <div>
        <div>
          <TasksForm />
        </div>
        <div class="h-96 scroll-container overflow-y-auto scrollbar-w-2 scrollbar-track-gray-100 scrollbar-thumb-gray-300">
          <TasksList tasks={data.project.tasks} />
        </div>
      </div>
    </div>
  );
}
