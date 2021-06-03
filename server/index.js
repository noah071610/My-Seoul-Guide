"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var resolvers_1 = require("./resolvers");
var apollo_server_1 = require("apollo-server");
var typeDefs = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Content {\n    _text: String\n  }\n  type Id {\n    _text: String\n  }\n  type ActivityObj {\n    title: Content\n    firstimage: Content\n    addr1: Content\n    mapx: Content\n    mapy: Content\n    contentid: Id\n    overview: Content\n  }\n  type RecommendObj {\n    title: Content\n    firstimage: Content\n    mapx: Content\n    mapy: Content\n    contentid: Id\n  }\n  type Query {\n    ActivityCards(typeNum: Int!, pageNum: Int!): [ActivityObj]\n    FoodRecommendCards(isFood: Boolean!): [RecommendObj]\n    ShoppingRecommendCards(isShopping: Boolean!): [RecommendObj]\n    NearRecommendCards(mapx: Float!, mapy: Float!): [RecommendObj]\n  }\n"], ["\n  type Content {\n    _text: String\n  }\n  type Id {\n    _text: String\n  }\n  type ActivityObj {\n    title: Content\n    firstimage: Content\n    addr1: Content\n    mapx: Content\n    mapy: Content\n    contentid: Id\n    overview: Content\n  }\n  type RecommendObj {\n    title: Content\n    firstimage: Content\n    mapx: Content\n    mapy: Content\n    contentid: Id\n  }\n  type Query {\n    ActivityCards(typeNum: Int!, pageNum: Int!): [ActivityObj]\n    FoodRecommendCards(isFood: Boolean!): [RecommendObj]\n    ShoppingRecommendCards(isShopping: Boolean!): [RecommendObj]\n    NearRecommendCards(mapx: Float!, mapy: Float!): [RecommendObj]\n  }\n"])));
var server = new apollo_server_1.ApolloServer({ typeDefs: typeDefs, resolvers: resolvers_1.resolvers });
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("Server ready at " + url);
});
var templateObject_1;
