import { useParams } from "react-router-dom";
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
    <div className="">
      <div>
        <h1 className="text-2x1">{data.project.name}</h1>
        <p>{data.project.description}</p>
      </div>

      <button className="bg-red-500 px-3 py-2">Delete</button>
      <TasksForm />
      <TasksList tasks={data.project.tasks} />
    </div>
  );
}
