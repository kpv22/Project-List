import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../graphql/projects";
import { TasksList } from "../components/tasks/TasksList";
import { TasksForm } from "../components/tasks/TasksForm";

export function ProjectDetails() {
  const params = useParams();
  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: {
      id: params.id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div>
      <Link to="/projects">
        <button className="bg-green-500 text-white px-3 py-2 rounded-lg">
          Back
        </button>
      </Link>
      <div className="bg-zinc-900 mb-2 p-10 flex justify-between">
        <div>
          <h1 className="text-2x1">{data.project.name}</h1>
          <p>{data.project.description}</p>
        </div>
      </div>
      <button className="bg-red-500 px-3 py-2 rounded-lg">Delete</button>
      <br></br>
      <div>
        <TasksForm />
        <TasksList tasks={data.project.tasks} />
      </div>
    </div>
  );
}
