import { acmCardList, airportList } from "./../config";
import { observable, configure, action } from "mobx";
import {
  AnalyzerStore,
  ChartInter,
  CheckListStore,
  IdxHash,
  MainStore,
  PaymentListInter,
} from "../types";

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

const analyzerStore = observable<AnalyzerStore>({
  paymentList: null,
  chartValue: {
    total: 0,
    airfare: 1,
    transport: 1,
    stay: 1,
    food: 1,
    attractions: 1,
    shopping: 1,
  },
  addPaymentList: action((form: PaymentListInter) => {
    if (analyzerStore.paymentList) {
      analyzerStore.paymentList.push(form);
    } else {
      analyzerStore.paymentList = [form];
    }
    switch (form.type) {
      case "Stay":
        if (analyzerStore.chartValue.stay === 1) {
          analyzerStore.chartValue.stay = form.payment;
        } else {
          analyzerStore.chartValue.stay += form.payment;
        }
        break;
      case "Airfare":
        if (analyzerStore.chartValue.airfare === 1) {
          analyzerStore.chartValue.airfare = form.payment;
        } else {
          analyzerStore.chartValue.airfare += form.payment;
        }
        break;
      case "Shopping":
        if (analyzerStore.chartValue.shopping === 1) {
          analyzerStore.chartValue.shopping = form.payment;
        } else {
          analyzerStore.chartValue.shopping += form.payment;
        }
        break;
      case "Transport":
        if (analyzerStore.chartValue.transport === 1) {
          analyzerStore.chartValue.transport = form.payment;
        } else {
          analyzerStore.chartValue.transport += form.payment;
        }
        break;
      case "Attractions":
        if (analyzerStore.chartValue.attractions === 1) {
          analyzerStore.chartValue.attractions = form.payment;
        } else {
          analyzerStore.chartValue.attractions += form.payment;
        }
        break;
      case "Food":
        if (analyzerStore.chartValue.food === 1) {
          analyzerStore.chartValue.food = form.payment;
        } else {
          analyzerStore.chartValue.food += form.payment;
        }
        break;
    }
    localStorage.setItem("payment_list", JSON.stringify(analyzerStore.paymentList));
    localStorage.setItem("chartValue", JSON.stringify(analyzerStore.chartValue));
  }),
  setPaymentList: action((storelists: PaymentListInter[]) => {
    analyzerStore.paymentList = storelists;
  }),
  deletePaymentList: action((id: number, type: string, cost: number) => {
    if (analyzerStore.paymentList?.length === 1) {
      analyzerStore.paymentList = null;
      localStorage.removeItem("payment_list");
    } else {
      analyzerStore.paymentList?.splice(id, 1);
      localStorage.setItem("payment_list", JSON.stringify(analyzerStore.paymentList));
    }
    switch (type) {
      case "Stay":
        analyzerStore.chartValue.stay -= cost;
        break;
      case "Airfare":
        analyzerStore.chartValue.airfare -= cost;
        break;
      case "Shopping":
        analyzerStore.chartValue.shopping -= cost;
        break;
      case "Transport":
        analyzerStore.chartValue.transport -= cost;
        break;
      case "Attractions":
        analyzerStore.chartValue.attractions -= cost;
        break;
      case "Food":
        analyzerStore.chartValue.food -= cost;
        break;
    }
  }),
  setTotal: action((total: number) => {
    analyzerStore.chartValue.total = total;
    localStorage.setItem("chartValue", JSON.stringify(analyzerStore.chartValue));
  }),
  setChart: action((chart: ChartInter) => {
    analyzerStore.chartValue = chart;
  }),
});

const mainStore = observable<MainStore>({
  acmCard: null,
  activeMenuIdx: null,
  onSmallNav: false,
  itemList: null,
  airport: null,
  setAirport: action((number: number) => {
    mainStore.airport = airportList[number];
  }),
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

export { checkListStore, mainStore, analyzerStore };
