import { resolvers } from "./resolvers";
import { ApolloServer } from "apollo-server";
import { typeDefs } from "./gql";
import cors from "cors";
import express from "express";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();
app.use(cors({ origin: true, credentials: true }));
//"https://myseoulguide.site"
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
