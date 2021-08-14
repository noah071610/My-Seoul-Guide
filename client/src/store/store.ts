import { PlaceCardInter, UserInfo } from "../types";
import { placeList, airportList, valueList } from "../config";
import { observable, configure, action } from "mobx";
import { CheckListStore, IdxHash, MainStore, TogoInter } from "../types";

configure({ enforceActions: "always" });

const checkListStore = observable<CheckListStore>({
  // 체크된 모든 사항은 checkListStore 가 담당합니다.
  age: null,
  gender: null,
  party: null,
  purpose: [],
  acm: [],
  overlayCnt: 4,
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
    // 중복을 최소화 하기 위해 조건문을 활용하였습니다.
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
    checkListStore.clearOverlayCnt(4);
    checkListStore.isPermanetSubmit = false;
    checkListStore.isSubmit = false;
    mainStore.onInfoModal = false;
  }),
  onSubmit: action(() => {
    const map = new Map();
    const recommendsArr: string[] = [];
    //유저에게 받은 정보를 저장합니다.
    let userInfo = {
      gender: checkListStore.gender!,
      age: checkListStore.age!,
      party: checkListStore.party!,
      acm: [...checkListStore.acm],
      purpose: [...checkListStore.purpose],
    };

    //놀거리 추천에 이용할 항목과 특수키는 사전에 따로 분류합니다.
    for (const v of checkListStore?.purpose) {
      switch (v) {
        case "Food":
          recommendsArr.push(userInfo.purpose.splice(userInfo.purpose.indexOf(v), 1)[0]);
          break;
        case "Shopping":
          recommendsArr.push(userInfo.purpose.splice(userInfo.purpose.indexOf(v), 1)[0]);
          break;
        case "K-pop":
          recommendsArr.push(userInfo.purpose.splice(userInfo.purpose.indexOf(v), 1)[0]);
          break;
        case "Native Recommendation":
          userInfo.purpose.splice(userInfo.purpose.indexOf(v), 1);
          break;
        case "Plastic surgery":
          userInfo.purpose.splice(userInfo.purpose.indexOf(v), 1);
          break;
      }
    }

    //숙박 추천에 이용할 항목을 담습니다.
    let userPick = [...userInfo.purpose, ...userInfo.acm, userInfo.age];

    //숙박 추천에 관한 데이터를 ID와 value값으로 가져옵니다.
    const places = valueList.map((v) => {
      return { id: v.id, valueList: v.values.sort() };
    });

    //=========== Recommend Stay finder start =================

    // 해시맵과 그 메쏘드를 이용한 알고리즘입니다. 점수산출 근거는 기존점수 나누기 이용자의 항목선택수 에 따릅니다.
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

    //분류를 위해 해시맵으로 되어있는 데이터를 다시 id와 cnt(획득점수)로 배열화하고 cnt순으로 내림차 정렬합니다.
    let rankPlace = Array.from(map, ([id, cnt]) => ({ id, cnt })).sort((a, b) => b.cnt - a.cnt);

    //===== special Key ======
    //특수키로 이용자의 항목에 이 키가 있으면 rankPlace에서 순위 변경 작업이 일어납니다.
    //명동은 서울토박이들은 추천하지않습니다. 대체제도 많고요  Native Recommendation 이라면 명동은 제외시켜버립니다.
    if (checkListStore.purpose.includes("Native Recommendation")) {
      rankPlace = rankPlace.filter((v) => v.id !== 1);
    }
    //강남은 성형에 성지입니다. 성형하러왔는데 강남에서 숙소 안잡았다가 고생하는 외국인들 정말 많이 봤습니다. 순위를 맨위로 올립니다.
    if (checkListStore.purpose.includes("Plastic surgery")) {
      rankPlace.unshift(rankPlace.splice(rankPlace.map((v) => v.id).indexOf(3), 1)[0]);
    }

    //상위 두개만 추천할거기 때문에 상위 2곳에 값만 따로 때옵니다.
    let solution = rankPlace.slice(0, 2).map((v) => {
      return placeList[v.id - 1];
    });

    solution.forEach((v, i) => (v.point = rankPlace[i].cnt));

    //=================^^ Recommend Stay finder done. ^^=====================

    userInfo.purpose = recommendsArr;
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
