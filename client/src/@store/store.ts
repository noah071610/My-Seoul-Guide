import { acmCardList, airportList } from "./../config";
import { observable, configure, action } from "mobx";
import { IdxHash } from "../components/Navigation";

configure({ enforceActions: "always" });

interface CheckListStore {
  gender: string | null;
  age: string | null;
  party: string | null;
  purpose: string[] | null;
  acm: string[] | null;
  isSubmit: boolean;
  changeTaste: (data: string[], name: string) => void;
  changeInfo: (data: string, name: string) => void;
  onSubmit: () => void;
}

const checkListStore = observable<CheckListStore>({
  gender: null,
  age: null,
  party: null,
  purpose: null,
  acm: null,
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
    checkListStore.isSubmit = true;
  }),
});

export interface PathObj {
  lat: number;
  lng: number;
}

export interface AcmCard {
  name: string;
  src: string;
  href: string;
  desc: string;
  rate: number;
  tags: string[];
  path: PathObj[];
  stationPath: PathObj;
}

export interface AirportInter {
  name: string;
  path: PathObj;
  src: string;
}

interface MainStore {
  acmCard: AcmCard | null;
  activeMenuIdx: IdxHash | null;
  onSmallNav: boolean;
  addAcmCard: (data: number) => void;
  deleteAcmCard: () => void;
  onChangeActiveMenu: (data: IdxHash | null) => void;
  onToggleSmallNav: () => void;
  getContents: (res: any) => void;
  itemList: any;
}

const mainStore = observable<MainStore>({
  acmCard: null,
  activeMenuIdx: null,
  onSmallNav: false,
  itemList: null,
  deleteAcmCard: action(() => {
    mainStore.acmCard = null;
  }),
  addAcmCard: action((data: number) => {
    mainStore.acmCard = acmCardList[data];
  }),
  onChangeActiveMenu: action((data: IdxHash | null) => {
    mainStore.activeMenuIdx = data !== null ? data : null;
  }),
  onToggleSmallNav: action(() => {
    mainStore.onSmallNav = !mainStore.onSmallNav;
  }),
  getContents: action((res: any) => {
    let itemList: any = [];
    let itemArr = res.data.elements[0].elements[1].elements[0].elements.map((v: any) => {
      return v.elements;
    });
    for (const itemList of itemArr) {
      let item: any = {};
      let path: any = [];
      itemList.forEach((e: any) => {
        if (e.name === "title") {
          item.title = e.elements[0].text;
        }
        if (e.name === "firstimage") {
          item.image = e.elements[0].text;
        }
        if (e.name === "addr1") {
          item.adr = e.elements[0].text;
        }
        if (e.name === "mapx") {
          path.push(parseFloat(e.elements[0].text));
        }
        if (e.name === "mapy") {
          path.push(parseFloat(e.elements[0].text));
        }
      });
      item.path = path;
      itemList.push(item);
    }
    mainStore.itemList = itemList;
  }),
});

export { checkListStore, mainStore };
