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

interface AcmCard {
  name: string;
  src: string;
  href: string;
  desc: string;
  rate: number;
  tags: string[];
  path: PathObj[];
  stationPath: PathObj;
}

interface AirportInter {
  name: string;
  path: PathObj;
}

interface MainStore {
  acmCard: AcmCard | null;
  airportInfo: AirportInter | null;
  activeMenuIdx: IdxHash | null;
  onSmallNav: boolean;
  addAcmCard: (data: number) => void;
  deleteAcmCard: () => void;
  addAirportCard: (data: number) => void;
  deleteAirportCard: () => void;
  onChangeActiveMenu: (data: IdxHash | null) => void;
  onToggleSmallNav: () => void;
}

const mainStore = observable<MainStore>({
  acmCard: null,
  airportInfo: null,
  activeMenuIdx: null,
  onSmallNav: false,
  deleteAcmCard: action(() => {
    mainStore.acmCard = null;
  }),
  addAcmCard: action((data: number) => {
    mainStore.acmCard = acmCardList[data];
  }),
  deleteAirportCard: action(() => {
    mainStore.airportInfo = null;
  }),
  addAirportCard: action((data: number) => {
    mainStore.airportInfo = airportList[data];
  }),
  onChangeActiveMenu: action((data: IdxHash | null) => {
    mainStore.activeMenuIdx = data !== null ? data : null;
  }),
  onToggleSmallNav: action(() => {
    mainStore.onSmallNav = !mainStore.onSmallNav;
  }),
});

export { checkListStore, mainStore };
