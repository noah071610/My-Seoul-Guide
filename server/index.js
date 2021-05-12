const { ApolloServer, gql } = require("apollo-server");
require("dotenv").config();
const fetch = require("node-fetch");
const convert = require("xml-js");

const getItems = () => {
  return fetch(
    "http://api.visitkorea.or.kr/openapi/service/rest/EngService/areaBasedList?ServiceKey="
  )
    .then((res) => json)
    .then((json) => json.body.items);
};

const typeDefs = gql`
  type Query {
    items: [item]
  }
  type item {
    contentid: Int
  }
`;

const resolvers = {
  Query: {
    items: () => getItems(),
  },
};
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
