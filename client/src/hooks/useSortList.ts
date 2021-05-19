export default function sortList(obj: any) {
  let array = obj.NearRecommendCards;
  let arrLength = obj.NearRecommendCards.length;
  if (obj.ShoppingRecommendCards) {
    array = obj.ShoppingRecommendCards.concat(array).slice(0, arrLength);
  }
  if (obj.FoodRecommendCards) {
    array = obj.FoodRecommendCards.concat(array).slice(0, arrLength);
  }
  return array;
}
