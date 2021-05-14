import { ApolloServer, gql } from "apollo-server";
import { getItems, getOverViews } from "./db";

const typeDefs = gql`
  type Content {
    _text: String
  }
  type Id {
    _text: String
  }
  type List {
    title: Content
    firstimage: Content
    addr1: Content
    mapx: Content
    mapy: Content
    contentid: Id
    overview: Content
  }
  type Query {
    ActivityCard(typeNum: Int!): [List]
  }
`;

const resolvers = {
  Query: {
    ActivityCard: (_: any, { typeNum }: { typeNum: number }) => getItems(typeNum),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
