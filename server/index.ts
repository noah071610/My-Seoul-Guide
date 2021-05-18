import { ApolloServer, gql } from "apollo-server";
import { getActivities, getFoodRecommends, getShoppingRecommends, getNearRecommends } from "./db";

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
  }
  type Query {
    ActivityCards(typeNum: Int!): [ActivityObj]
    FoodRecommendCards: [RecommendObj]
    ShoppingRecommendCards: [RecommendObj]
    NearRecommendCards(mapx: Float!, mapy: Float!): [RecommendObj]
  }
`;

const resolvers = {
  Query: {
    ActivityCards: (_: any, { typeNum }: { typeNum: number }) => getActivities(typeNum),
    FoodRecommendCards: () => getFoodRecommends(),
    ShoppingRecommendCards: () => getShoppingRecommends(),
    NearRecommendCards: (_: any, { mapx, mapy }: { mapx: number; mapy: number }) =>
      getNearRecommends(mapx, mapy),
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
