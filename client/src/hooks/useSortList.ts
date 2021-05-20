import { TogoRecommedInter } from "../types";
import { kpop_recommends } from "./../config";

interface TogoListsInter {
  FoodRecommendCards?: TogoRecommedInter[];
  ShoppingRecommendCards?: TogoRecommedInter[];
  NearRecommendCards: TogoRecommedInter[];
}

interface Props {
  data: TogoListsInter;
  isKpop: boolean | undefined;
}

export default function sortList(form: Props) {
  let array = form.data.NearRecommendCards;
  let arrLength = form.data.NearRecommendCards.length;
  if (form.data.ShoppingRecommendCards) {
    array = form.data.ShoppingRecommendCards.concat(array).slice(0, arrLength);
  }
  if (form.data.FoodRecommendCards) {
    array = form.data.FoodRecommendCards.concat(array).slice(0, arrLength);
  }
  if (form.isKpop) {
    array = kpop_recommends.concat(array).slice(0, arrLength);
  }
  return array;
}
