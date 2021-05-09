import { observable, configure, action } from "mobx";

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

export { checkListStore };
