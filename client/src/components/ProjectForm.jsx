import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PROJECT } from "../graphql/projects";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ProjectForm() {
  const [project, setProject] = useState({
    name: "",
    description: "",
  });
  const [error1, setError1] = useState("");

  const [createProject, { loading, error }] = useMutation(CREATE_PROJECT, {
    refetchQueries: ["getProjects"],
  });

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const handleSudmit = (e) => {
    e.preventDefault(e);
    if (project.name.length > 120) {
      setError1("Title cannot be longer than 120 characters");
      return;
    }
    createProject({
      variables: {
        name: project.name,
        description: project.description,
      },
    })
      .then(() => {
        toast.success("Project added", {
          position: "top-right",
          closeOnClick: true,
          autoClose: 3000,
          theme: "dark",
        });
        setProject({
          name: "",
          description: "",
        });
      })
      .catch((error) => {
        setError1(error.message);
      });
  };

  useEffect(() => {
    if (error1) {
      toast.error(error1, {
        position: "top-left",
        closeOnClick: true,
        autoClose: 3000,
        theme: "dark",
      });
      setTimeout(() => {
        setError1("");
      }, 3000);
    }
  }, [error1]);

  return (
    <form onSubmit={handleSudmit} className="w-4/5">
      <input
        type="text"
        name="name"
        placeholder="Write a title"
        onChange={handleChange}
        className="bg-zinc-800 text-white rounded-lg shadow-lg p-4 block w-full mb-3"
        value={project.name}
      />
      <textarea
        value={project.description}
        name="description"
        rows="4"
        placeholder="Write a description"
        onChange={handleChange}
        className="bg-zinc-800 text-white rounded-lg shadow-lg p-4 block w-full mb-3 resize-none"
      />
      <button
        disabled={
          !project.name ||
          !project.description ||
          loading ||
          !project.name.trim() ||
          !project.description.trim()
        }
        className="bg-green-500 px-4 py-1 rounded-md text-lg mb-3 hover:bg-green-400 disabled:bg-zinc-400"
      >
        Save
      </button>
      <ToastContainer />
    </form>
  );
}
