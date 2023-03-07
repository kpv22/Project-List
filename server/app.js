import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import http from "http";

export async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: {
      origin: "*", // Permitir todas las solicitudes de origen cruzado
    },
  });

  await server.start();

  app.use(cors(), express.json(), expressMiddleware(server));

  await new Promise((resolve) =>
    httpServer.listen(
      {
        port: process.env.PORT || 4000,
        host: "0.0.0.0",
      },
      resolve
    )
  );
  console.log("Server ready at http://localhost:4000/graphql");
}
