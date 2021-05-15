import { PlaceCardInter, UserInfo } from "./../types";
import { placeList, airportList } from "./../config";
import { observable, configure, action } from "mobx";
import { CheckListStore, IdxHash, MainStore, TogoInter } from "../types";

configure({ enforceActions: "always" });

const checkListStore = observable<CheckListStore>({
  age: null,
  gender: null,
  party: null,
  purpose: [],
  acm: [],
  isSubmit: false,
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
  onSubmit: action(() => {
    let userInfo = {
      gender: checkListStore.gender!,
      age: checkListStore.age!,
      party: checkListStore.party!,
      acm: checkListStore.acm,
      purpose: checkListStore.purpose,
    };
    const userPick = [...checkListStore.purpose, ...checkListStore.acm, checkListStore.age];

    const map = new Map();
    const list = placeList.map((v) => {
      return { id: v.id, valueList: v.valueList.sort() };
    });

    for (let i = 0; i < userPick.length; i++) {
      for (let j = 0; j < list.length; j++) {
        list[j].valueList.forEach((placeValues) => {
          if (placeValues.value === userPick[i]) {
            if (map.get(list[j].id)) {
              map.set(list[j].id, map.get(list[j].id) + placeValues.rate);
            } else {
              map.set(list[j].id, placeValues.rate);
            }
          }
          //========================
        });
      }
    }

    let rankPlace = Array.from(map, ([id, cnt]) => ({ id, cnt })).sort((a, b) => b.cnt - a.cnt);

    //========= special Key =================================

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

    //=======================================================

    let solution = rankPlace
      .map((v) => v.id)
      .slice(0, 2)
      .map((v) => {
        return placeList[v - 1];
      });

    mainStore.userInfo = userInfo;
    mainStore.recommend_places = solution;

    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("recommend_places", JSON.stringify(solution));

    setTimeout(
      action(() => {
        checkListStore.isSubmit = true;
      }),
      3000
    );
  }),
});

const mainStore = observable<MainStore>({
  recommend_places: [],
  userInfo: null,
  togoLists: [],
  place: null,
  activeMenuIdx: null,
  onSmallNav: false,
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
  // deleteAcmCard: action(() => {
  //   mainStore.recommend_place = null;
  // }),
  changePlace: action((data: number) => {
    mainStore.place = placeList[data];
  }),
  onChangeActiveMenu: action((data: IdxHash | null) => {
    mainStore.activeMenuIdx = data !== null ? data : null;
  }),
  onToggleSmallNav: action(() => {
    mainStore.onSmallNav = !mainStore.onSmallNav;
  }),
});

export { checkListStore, mainStore };
