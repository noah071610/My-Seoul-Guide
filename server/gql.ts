import { gql } from "apollo-server";

export const typeDefs = gql`
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
