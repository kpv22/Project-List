import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ProjectForm } from "../components/ProjectForm";
import { ProjectList } from "../components/ProjectList";
import { Footer } from "../components/Footer/Footer";

export function Projects() {
  const [animationDone, setAnimationDone] = useState(false);

  useEffect(() => {
    setAnimationDone(true);
  }, []);

  return (
    <div>
      <motion.div
        initial={animationDone ? {} : { opacity: 0, y: 2 }}
        animate={animationDone ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="bg-zing-900 rounded-md shadow-lg shadow-black p-8 sm:h-5/6 sm:w-full"
      >
        <h1 className="text-2x1 font-bold py-2 my-4">Project Manager</h1>
        <div className="flex flex-col w-full sm:flex-row justify-between gap-x-1">
          <ProjectForm />
          <div className=" max-h-screen w-3/4 sm:w-full overflow-y-auto">
            <ProjectList />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={animationDone ? {} : { opacity: 0, y: 2 }}
        animate={animationDone ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 2 }}
        className="w-full"
      >
        <Footer style={{ opacity: 0 }} />
      </motion.div>
    </div>
  );
}
