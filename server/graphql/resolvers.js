import Project from "../models/Project.js";
import Task from "../models/Task.js";
import { validateText } from "../validations/validations.js";

export const resolvers = {
  Query: {
    hello: () => "Hello world!",
    projects: async () => await Project.find(),
    tasks: async () => await Task.find(),
    project: async (_, { _id }) => await Project.findById(_id),
    task: async (_, { _id }) => await Task.findById(_id),
  },
  Mutation: {
    createProject: async (_, { name, description }) => {
      if (!validateText(name) || !validateText(description)) {
        throw new Error("Invalid characters in name or description");
      }
      const existingProject = await Project.findOne({ name });
      if (existingProject) {
        throw new Error("Project with this name already exists");
      }

      const project = new Project({
        name,
        description,
      });
      const savedProject = await project.save();
      return savedProject;
    },
    createTask: async (_, { title, projectId }) => {
      if (!validateText(title)) {
        throw new Error("Invalid characters in title");
      }
      const projectFound = await Project.findById(projectId);
      if (!projectFound) throw new Error("Project not found");

      const task = new Task({
        title,
        projectId,
      });
      const taskSaved = await task.save();
      return taskSaved;
    },
    updateProject: async (_, args) => {
      if (!validateText(args.name) || !validateText(args.description)) {
        throw new Error("Invalid characters in name or description");
      }
      const updatedProject = await Project.findByIdAndUpdate(args._id, args, {
        new: true,
      });
      if (!updatedProject) throw new Error("Project not found");
      return updatedProject;
    },
    updateTask: async (_, args) => {
      if (!validateText(args.title)) {
        throw new Error("Invalid characters in title");
      }
      const updatedTask = await Task.findByIdAndUpdate(args._id, args, {
        new: true,
      });
      if (!updatedTask) throw new Error("Task not found");
      return updatedTask;
    },
    deleteProject: async (_, { _id }) => {
      const deletedProject = await Project.findByIdAndDelete(_id);
      if (!deletedProject) throw new Error(`Project not found`);
      await Task.deleteMany({ projectId: deletedProject._id });
      return deletedProject;
    },
    deleteTask: async (_, { _id }) => {
      const deletedTask = await Task.findByIdAndDelete(_id);
      if (!deletedTask) throw new Error(`Task not found`);
      return deletedTask;
    },
  },
  Project: {
    tasks: async (parent) => await Task.find({ projectId: parent._id }),
  },
  Task: {
    project: async (parent) => await Project.findById(parent.projectId),
  },
};
