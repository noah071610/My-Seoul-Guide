import { getActivities, getFoodRecommends, getNearRecommends, getShoppingRecommends } from "./db";

export const resolvers = {
  Query: {
    ActivityCards: (_: any, { typeNum, pageNum }: { typeNum: number; pageNum: number }) =>
      getActivities(typeNum, pageNum),
    FoodRecommendCards: (_: any, { isFood }: { isFood: boolean }) => getFoodRecommends(isFood),
    ShoppingRecommendCards: (_: any, { isShopping }: { isShopping: boolean }) =>
      getShoppingRecommends(isShopping),
    NearRecommendCards: (_: any, { mapx, mapy }: { mapx: number; mapy: number }) =>
      getNearRecommends(mapx, mapy),
  },
};
