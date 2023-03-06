import { startApolloServer } from "./app.js";
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";
import { connectDB } from "./db.js";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.BACKEND_PORT || 4000;
connectDB();
startApolloServer(typeDefs, resolvers);
