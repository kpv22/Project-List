import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { GET_PROJECTS } from "../graphql/projects";
import { ProjectCard } from "./ProjectCard";
import { Loading } from "../components/Loading/Loading";

export function ProjectList() {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  if (loading) return <Loading />;
  if (error) return <p>Error</p>;

  // establecemos una animación con un retraso aleatorio para cada elemento
  const variants = {
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
    hidden: { opacity: 0, y: 20 },
  };

  return (
    <div className="overflow-y-auto h-96 w-full px-5">
      {data.projects.map((project, i) => (
        <motion.div
          key={project._id}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={variants}
        >
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </div>
  );
}
