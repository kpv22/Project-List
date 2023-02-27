import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PROJECT, GET_PROJECTS } from "../graphql/projects";

export function ProjectForm() {
  const [project, setProject] = useState({
    name: "",
    description: "",
  });

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
    createProject({
      variables: {
        name: project.name,
        description: project.description,
      },
    });
  };

  return (
    <form onSubmit={handleSudmit} className="w-4/5">
      {error && <p>{error.message}</p>}
      <input
        type="text"
        name="name"
        placeholder="Write a title"
        onChange={handleChange}
        className="bg-zinc-800 text-white rounded-lg shadow-lg p-4 block w-full mb-3"
      />
      <textarea
        name="description"
        rows="4"
        placeholder="Write a description"
        onChange={handleChange}
        className="bg-zinc-800 text-white rounded-lg shadow-lg p-4 block w-full mb-3 resize-none"
      />
      <button
        disabled={!project.name || !project.description || loading}
        className="bg-green-500 px-4 py-1 rounded-md text-lg mb-3 hover:bg-green-400 disabled:bg-zinc-400"
      >
        Save
      </button>
    </form>
  );
}
