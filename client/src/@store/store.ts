import { PlaceCardInter, UserInfo } from "./../types";
import { placeList, airportList, valueList } from "./../config";
import { observable, configure, action } from "mobx";
import { CheckListStore, IdxHash, MainStore, TogoInter } from "../types";

configure({ enforceActions: "always" });

const checkListStore = observable<CheckListStore>({
  age: null,
  gender: null,
  party: null,
  purpose: [],
  acm: [],
  overlayCnt: 3,
  isSubmit: false,
  isPermanetSubmit: false,
  changeTaste: action((data: string[], name: string) => {
    if (name === "purpose") {
      checkListStore.purpose = data;
    } else {
      checkListStore.acm = data;
    }
  }),
  changeInfo: action((data: string, name: string) => {
    if (name === "gender") {
      checkListStore.gender = data;
    } else if (name === "age") {
      checkListStore.age = data;
    } else {
      checkListStore.party = data;
    }
  }),
  discountOverlayCnt: action(() => {
    --checkListStore.overlayCnt;
  }),
  clearOverlayCnt: action((num: number) => {
    checkListStore.overlayCnt = num;
  }),
  goBack: action(() => {
    localStorage.clear();
    checkListStore.clearOverlayCnt(3);
    checkListStore.isPermanetSubmit = false;
    checkListStore.isSubmit = false;
    mainStore.onInfoModal = false;
  }),
  onSubmit: action(() => {
    const map = new Map();
    let userInfo = {
      gender: checkListStore.gender!,
      age: checkListStore.age!,
      party: checkListStore.party!,
      acm: checkListStore.acm,
      purpose: checkListStore.purpose,
    };
    let userPick = [...checkListStore.purpose, ...checkListStore.acm, checkListStore.age];
    const places = valueList.map((v) => {
      return { id: v.id, valueList: v.values.sort() };
    });

    //=========== Recommend Stay finder start =================

    for (let i = 0; i < userPick.length; i++) {
      for (let j = 0; j < places.length; j++) {
        places[j].valueList.forEach((place) => {
          if (place.value === userPick[i]) {
            if (map.get(places[j].id)) {
              map.set(
                places[j].id,
                map.get(places[j].id) + Math.floor(place.rate / userPick.length)
              );
            } else {
              map.set(places[j].id, Math.floor(place.rate / userPick.length));
            }
          }
        });
      }
    }

    let rankPlace = Array.from(map, ([id, cnt]) => ({ id, cnt })).sort((a, b) => b.cnt - a.cnt);

    //===== special Key ======

    if (userPick.includes("Native Recommendation")) {
      rankPlace = rankPlace.filter((v) => v.id !== 1);
    }

    if (userPick.includes("Native Recommendation") && !userPick.includes("Luxury")) {
      rankPlace = rankPlace.filter((v) => v.id !== 1);
      if (!userPick.includes("Plastic surgery")) {
        rankPlace = rankPlace.filter((v) => v.id !== 3);
      }
    }

    if (userPick.includes("Plastic surgery")) {
      rankPlace.unshift(rankPlace.splice(rankPlace.map((v) => v.id).indexOf(3), 1)[0]);
    }

    let solution = rankPlace.slice(0, 2).map((v) => {
      return placeList[v.id - 1];
    });

    solution.forEach((v, i) => (v.point = rankPlace[i].cnt));

    //=================^^ Recommend Stay finder done. ^^=====================

    //================ Recommend Attraction finder start .. ================

    let arr: string[] = [];
    userInfo?.purpose.forEach((v) => {
      switch (v) {
        case "Food":
          arr.push(v);
          break;
        case "Shopping":
          arr.push(v);
          break;
        case "K-pop":
          arr.push(v);
          break;
        default:
          break;
      }
    });
    userInfo.purpose = arr;

    mainStore.userInfo = userInfo;
    mainStore.recommend_places = solution;
    mainStore.place = solution[0];
    checkListStore.isSubmit = true;

    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("recommend_places", JSON.stringify(solution));
    localStorage.setItem("place", JSON.stringify(solution[0]));
  }),
});

const mainStore = observable<MainStore>({
  recommend_places: [],
  userInfo: null,
  togoLists: [],
  place: null,
  destination: null,
  activeMenuIdx: null,
  onSmallNav: false,
  onInfoModal: false,
  itemList: null,
  airport: null,
  addTogoList: action((form: TogoInter) => {
    mainStore.togoLists.push(form);
    if (mainStore.togoLists.length === 0) {
      localStorage.setItem("togo_list", JSON.stringify([form]));
    } else {
      localStorage.setItem("togo_list", JSON.stringify(mainStore.togoLists));
    }
  }),
  setTogoList: action((form: TogoInter[]) => {
    mainStore.togoLists = form;
  }),
  setUserInfo: action((form: UserInfo) => {
    mainStore.userInfo = form;
  }),
  setRecommend_places: action((form: PlaceCardInter[]) => {
    mainStore.recommend_places = form;
    checkListStore.isSubmit = true;
    checkListStore.isPermanetSubmit = true;
  }),
  deleteTogoList: action((contentid: string) => {
    mainStore.togoLists = mainStore.togoLists.filter((v) => {
      return v.contentid !== contentid;
    });
    if (mainStore.togoLists.length === 0) {
      localStorage.removeItem("togo_list");
    } else {
      localStorage.setItem("togo_list", JSON.stringify(mainStore.togoLists));
    }
  }),
  setAirport: action((number: number) => {
    mainStore.airport = airportList[number];
  }),
  changePlace: action((data: number) => {
    mainStore.place = placeList[data];
  }),
  changeDestination: action((data: number) => {
    mainStore.destination = placeList[data];
  }),
  onChangeActiveMenu: action((data: IdxHash | null) => {
    mainStore.activeMenuIdx = data !== null ? data : null;
  }),
  onToggleSmallNav: action(() => {
    mainStore.onSmallNav = !mainStore.onSmallNav;
  }),
  onToggleInfoModal: action(() => {
    mainStore.onInfoModal = !mainStore.onInfoModal;
  }),
  offSmallNav: action(() => {
    mainStore.onSmallNav = false;
  }),
  offInfoModal: action(() => {
    mainStore.onInfoModal = false;
  }),
});

export { checkListStore, mainStore };
