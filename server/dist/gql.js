"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.typeDefs = void 0;
var apollo_server_1 = require("apollo-server");
exports.typeDefs = apollo_server_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Content {\n    _text: String\n  }\n  type Id {\n    _text: String\n  }\n  type ActivityObj {\n    title: Content\n    firstimage: Content\n    addr1: Content\n    mapx: Content\n    mapy: Content\n    contentid: Id\n  }\n  type RecommendObj {\n    title: Content\n    firstimage: Content\n    mapx: Content\n    mapy: Content\n    contentid: Id\n  }\n  type Query {\n    ActivityCards(typeNum: Int!, pageNum: Int!): [ActivityObj]\n    FoodRecommendCards(isFood: Boolean!): [RecommendObj]\n    ShoppingRecommendCards(isShopping: Boolean!): [RecommendObj]\n    NearRecommendCards(mapx: Float!, mapy: Float!): [RecommendObj]\n  }\n"], ["\n  type Content {\n    _text: String\n  }\n  type Id {\n    _text: String\n  }\n  type ActivityObj {\n    title: Content\n    firstimage: Content\n    addr1: Content\n    mapx: Content\n    mapy: Content\n    contentid: Id\n  }\n  type RecommendObj {\n    title: Content\n    firstimage: Content\n    mapx: Content\n    mapy: Content\n    contentid: Id\n  }\n  type Query {\n    ActivityCards(typeNum: Int!, pageNum: Int!): [ActivityObj]\n    FoodRecommendCards(isFood: Boolean!): [RecommendObj]\n    ShoppingRecommendCards(isShopping: Boolean!): [RecommendObj]\n    NearRecommendCards(mapx: Float!, mapy: Float!): [RecommendObj]\n  }\n"])));
var templateObject_1;
