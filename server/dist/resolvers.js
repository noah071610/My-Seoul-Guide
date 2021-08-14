"use strict";
exports.__esModule = true;
exports.resolvers = void 0;
var db_1 = require("./db");
exports.resolvers = {
    Query: {
        ActivityCards: function (_, _a) {
            var typeNum = _a.typeNum, pageNum = _a.pageNum;
            return db_1.getActivities(typeNum, pageNum);
        },
        FoodRecommendCards: function (_, _a) {
            var isFood = _a.isFood;
            return db_1.getFoodRecommends(isFood);
        },
        ShoppingRecommendCards: function (_, _a) {
            var isShopping = _a.isShopping;
            return db_1.getShoppingRecommends(isShopping);
        },
        NearRecommendCards: function (_, _a) {
            var mapx = _a.mapx, mapy = _a.mapy;
            return db_1.getNearRecommends(mapx, mapy);
        }
    }
};
