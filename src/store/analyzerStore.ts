import { action, configure, observable } from "mobx";
import { AnalyzerStore, ChartInter, PaymentListInter } from "../types";

configure({ enforceActions: "always" });

const analyzerStore = observable<AnalyzerStore>({
  paymentList: null,
  originalTotal: 0,
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
      case "Stay 🛌":
        analyzerStore.chartValue.total -= form.payment;
        if (analyzerStore.chartValue.stay === 1) {
          analyzerStore.chartValue.stay = form.payment;
        } else {
          analyzerStore.chartValue.stay += form.payment;
        }
        break;
      case "Airfare ✈":
        analyzerStore.chartValue.total -= form.payment;
        if (analyzerStore.chartValue.airfare === 1) {
          analyzerStore.chartValue.airfare = form.payment;
        } else {
          analyzerStore.chartValue.airfare += form.payment;
        }
        break;
      case "Shopping 🥼":
        analyzerStore.chartValue.total -= form.payment;
        if (analyzerStore.chartValue.shopping === 1) {
          analyzerStore.chartValue.shopping = form.payment;
        } else {
          analyzerStore.chartValue.shopping += form.payment;
        }
        break;
      case "Transport 🚝":
        analyzerStore.chartValue.total -= form.payment;
        if (analyzerStore.chartValue.transport === 1) {
          analyzerStore.chartValue.transport = form.payment;
        } else {
          analyzerStore.chartValue.transport += form.payment;
        }
        break;
      case "Attractions 🎢":
        analyzerStore.chartValue.total -= form.payment;
        if (analyzerStore.chartValue.attractions === 1) {
          analyzerStore.chartValue.attractions = form.payment;
        } else {
          analyzerStore.chartValue.attractions += form.payment;
        }
        break;
      case "Food 🍝":
        analyzerStore.chartValue.total -= form.payment;
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
  setPaymentList: action((paylists: PaymentListInter[], originalTotal: number) => {
    analyzerStore.paymentList = paylists;
    analyzerStore.originalTotal = originalTotal;
  }),
  deletePaymentList: action((id: number, type: string, cost: number) => {
    if (analyzerStore.paymentList?.length === 1) {
      analyzerStore.paymentList = null;
      analyzerStore.originalTotal = 0;
      analyzerStore.chartValue = {
        total: 0,
        airfare: 1,
        transport: 1,
        stay: 1,
        food: 1,
        attractions: 1,
        shopping: 1,
      };
      localStorage.removeItem("payment_list");
      localStorage.removeItem("chartValue");
      localStorage.removeItem("original_total");
    } else {
      analyzerStore.paymentList?.splice(id, 1);
      localStorage.setItem("payment_list", JSON.stringify(analyzerStore.paymentList));
    }
    switch (type) {
      case "Stay 🛌":
        analyzerStore.chartValue.stay -= cost;
        break;
      case "Airfare ✈":
        analyzerStore.chartValue.airfare -= cost;
        break;
      case "Shopping 🥼":
        analyzerStore.chartValue.shopping -= cost;
        break;
      case "Transport 🚝":
        analyzerStore.chartValue.transport -= cost;
        break;
      case "Attractions 🎢":
        analyzerStore.chartValue.attractions -= cost;
        break;
      case "Food 🍝":
        analyzerStore.chartValue.food -= cost;
        break;
    }
  }),
  setTotal: action((total: number) => {
    analyzerStore.chartValue.total = total;
    analyzerStore.originalTotal = total;
    localStorage.setItem("chartValue", JSON.stringify(analyzerStore.chartValue));
    localStorage.setItem("original_total", JSON.stringify(analyzerStore.originalTotal));
  }),
  setChart: action((chart: ChartInter) => {
    analyzerStore.chartValue = chart;
  }),
});

export default analyzerStore;
