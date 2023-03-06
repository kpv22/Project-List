import { motion } from "framer-motion";
import { TasksCard } from "./TasksCard";

export function TasksList({ tasks }) {
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
    <div>
      {tasks.map((task, i) => (
        <motion.div
          key={task._id}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={variants}
        >
          <TasksCard task={task} />
        </motion.div>
      ))}
    </div>
  );
}
