export function ProjectCard({ project }) {
  return (
    <div>
      <h2>{project.name}</h2>
      <h2>{project.description}</h2>
    </div>
  );
}
