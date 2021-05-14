export interface PathObj {
  lat: number;
  lng: number;
}

export interface AcmCard {
  title: CardText;
  firstimage: CardText;
  href: string;
  overview: CardText;
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

export interface IdxHash {
  menuIdx: number;
  activeIdx: number;
}

export interface ChartInter {
  total: number;
  airfare: number;
  transport: number;
  stay: number;
  food: number;
  attractions: number;
  shopping: number;
}

export interface MainStore {
  acmCard: AcmCard | null;
  activeMenuIdx: IdxHash | null;
  onSmallNav: boolean;
  addAcmCard: (data: number) => void;
  deleteAcmCard: () => void;
  onChangeActiveMenu: (data: IdxHash | null) => void;
  onToggleSmallNav: () => void;
  getContents: (res: any) => void;
  deletePaymentList: (id: number) => void;
  addPaymentList: (data: PaymentListInter[]) => void;
  itemList: any;
  paymentList: PaymentListInter[] | null;
  chartValue: ChartInter;
}

export interface CheckListStore {
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

export interface CardText {
  _text: string;
}

export interface ContentCardInter {
  title: CardText;
  firstimage?: CardText;
  addr1?: CardText;
  href?: string;
  rate?: number;
  tags?: string[];
  path?: PathObj[];
  stationPath?: PathObj;
  overview: CardText;
}

export interface PaymentListInter {
  date: string;
  type: string;
  payment: string;
  memo: string;
}
