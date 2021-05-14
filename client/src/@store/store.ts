import { acmCardList } from "./../config";
import { observable, configure, action } from "mobx";
import { CheckListStore, IdxHash, MainStore, PaymentListInter } from "../types";

configure({ enforceActions: "always" });

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

const mainStore = observable<MainStore>({
  acmCard: null,
  activeMenuIdx: null,
  onSmallNav: false,
  itemList: null,
  paymentList: null,
  chartValue: { total: 1, airfare: 0, transport: 0, stay: 0, food: 0, attractions: 0, shopping: 0 },
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
  addPaymentList: action((data: PaymentListInter[]) => {
    mainStore.paymentList = data;
  }),
  deletePaymentList: action((id: number) => {
    if (mainStore.paymentList) {
      mainStore.paymentList.splice(id, 1);
    }
  }),
});

export { checkListStore, mainStore };
