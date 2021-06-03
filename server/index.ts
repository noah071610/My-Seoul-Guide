import { resolvers } from "./resolvers";
import { ApolloServer, gql } from "apollo-server";
import cors from "cors";
import express from "express";

const typeDefs = gql`
  type Content {
    _text: String
  }
  type Id {
    _text: String
  }
  type ActivityObj {
    title: Content
    firstimage: Content
    addr1: Content
    mapx: Content
    mapy: Content
    contentid: Id
    overview: Content
  }
  type RecommendObj {
    title: Content
    firstimage: Content
    mapx: Content
    mapy: Content
    contentid: Id
  }
  type Query {
    ActivityCards(typeNum: Int!, pageNum: Int!): [ActivityObj]
    FoodRecommendCards(isFood: Boolean!): [RecommendObj]
    ShoppingRecommendCards(isShopping: Boolean!): [RecommendObj]
    NearRecommendCards(mapx: Float!, mapy: Float!): [RecommendObj]
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();
app.use(cors({ origin: "https://myseoulguide.site", credentials: true }));

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
