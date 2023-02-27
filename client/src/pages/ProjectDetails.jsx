import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { DELETED_PROJECT, GET_PROJECT } from "../graphql/projects";
import { TasksList } from "../components/tasks/TasksList";
import { TasksForm } from "../components/tasks/TasksForm";
import { Loading } from "../components/Loading/Loading";

export function ProjectDetails() {
  const params = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: {
      id: params.id,
    },
  });

  const [deleteProject] = useMutation(DELETED_PROJECT, {
    refetchQueries: ["getProjects", "getProject"],
    onCompleted: () => {
      navigate("/projects");
    },
  });

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );

  if (error) return <p>Error!</p>;
  if (!data || !data.project || !data.project.name) {
    return <p>Not Project Found</p>;
  }
  return (
    <div style={{ width: "80%" }}>
      <div className="flex justify-between">
        <Link to="/projects">
          <button className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-400">
            Back
          </button>
        </Link>
        <button
          className="bg-red-500 px-3 py-2 rounded-lg hover:bg-red-400"
          onClick={() => {
            deleteProject({
              variables: { id: data.project._id },
            });
          }}
        >
          Delete
        </button>
      </div>

      <div className="bg-zinc-900 mb-2 p-10 flex justify-between w-full h-40">
        <div>
          <h1 className="text-2x1">{data.project.name}</h1>
          <p>{data.project.description}</p>
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
