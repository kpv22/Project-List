import { motion } from "framer-motion";
export const Footer = () => {
  return (
    <footer className="bg-zinc-800 text-white py-2 px-4 footer my-6 rounded-md shadow-lg shadow-black">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        <span className="text-sm">Development by Kevin Picado</span>
        <div className="flex row-auto ">
          <motion.a
            href="https://www.linkedin.com/in/kevin-p-131203255/"
            className="text-sm flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <span>LinkedIn</span>
            <img
              src="https://i.postimg.cc/xThMr2PB/logo-Linkedin.png"
              alt="Linkedln"
              className="w-auto ml-1 img mx-2"
            />
          </motion.a>
          <motion.a
            href="https://github.com/kpv22"
            className="text-sm flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <span>GitHub</span>
            <img
              src="https://i.postimg.cc/Vs9NRcSz/logo-Git-Hub.png"
              alt="github"
              className="w-auto ml-1 img mx-2"
            />
          </motion.a>
        </div>
      </div>
    </footer>
  );
};
