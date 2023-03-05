import { ProjectForm } from "../components/ProjectForm";
import { ProjectList } from "../components/ProjectList";

export function Projects() {
  return (
    <div className="bg-zing-900 rounded-md shadow-lg shadow-black p-8 sm:h-4/5 sm:w-4/5">
      <h1 className="text-2x1 font-bold py-2 mb-4">Project Manager</h1>
      <div className="flex flex-col sm:flex-row justify-between gap-x-1">
        <ProjectForm />
        <div className=" max-h-80 overflow-hidden">
          <ProjectList />
        </div>
      </div>
    </div>
  );
}
