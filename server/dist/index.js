"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var resolvers_1 = require("./resolvers");
var apollo_server_1 = require("apollo-server");
var gql_1 = require("./gql");
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var server = new apollo_server_1.ApolloServer({
    typeDefs: gql_1.typeDefs,
    resolvers: resolvers_1.resolvers
});
var app = express_1["default"]();
app.use(cors_1["default"]({ origin: true, credentials: true }));
//"https://myseoulguide.site"
server.listen().then(function (_a) {
    var url = _a.url;
    console.log("Server ready at " + url);
});
