import { ApolloServer, gql } from "apollo-server";
import { getItems } from "./db";

const typeDefs = gql`
  type Name {
    _text: String
  }
  type Id {
    _text: String
  }
  type AttrList {
    title: Name
    firstimage: Name
    addr1: Name
    mapx: Name
    mapy: Name
    contentid: Id
  }
  type Query {
    Contents(typeNum: Int!): [AttrList]
  }
`;

const resolvers = {
  Query: {
    Contents: (_: any, { typeNum }: { typeNum: number }) => getItems(typeNum),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
