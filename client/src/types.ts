export interface PathObj {
  lat: number;
  lng: number;
}

export interface UserInfo {
  gender: string;
  age: string;
  party: string;
  purpose: string[];
  acm: string[];
}

export interface PlaceValues {
  value: string;
  rate: number;
}

export interface PlaceCardInter {
  id: number;
  title: CardText;
  firstimage: CardText;
  href: string;
  overview: CardText;
  rate: number;
  tags: string[];
  path: PathObj[];
  stationPath: PathObj;
  point: number;
}

export interface AirportInter {
  id: number;
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

export interface AnalyzerStore {
  deletePaymentList: (id: number, type: string, cost: number) => void;
  addPaymentList: (data: PaymentListInter) => void;
  setPaymentList: (paylist: PaymentListInter[], originalTotal: number) => void;
  paymentList: PaymentListInter[] | null;
  chartValue: ChartInter;
  originalTotal: number | null;
  setTotal: (data: number) => void;
  setChart: (chart: ChartInter) => void;
}

export interface TogoInter {
  path: PathObj;
  title: string;
  contentid: string;
}

export interface MainStore {
  userInfo: UserInfo | null;
  recommend_places: PlaceCardInter[];
  activeMenuIdx: IdxHash | null;
  onSmallNav: boolean;
  onInfoModal: boolean;
  airport: AirportInter | null;
  togoLists: TogoInter[];
  place: PlaceCardInter | null;
  destination: PlaceCardInter | null;
  addTogoList: (form: TogoInter) => void;
  deleteTogoList: (contentid: string) => void;
  setAirport: (number: number) => void;
  changePlace: (listNum: number) => void;
  changeDestination: (listNum: number) => void;
  onChangeActiveMenu: (data: IdxHash | null) => void;
  onToggleSmallNav: () => void;
  onToggleInfoModal: () => void;
  offSmallNav: () => void;
  offInfoModal: () => void;
  setTogoList: (form: TogoInter[]) => void;
  setRecommend_places: (form: PlaceCardInter[]) => void;
  setUserInfo: (form: UserInfo) => void;
  itemList: any;
}

export interface CheckListStore {
  gender: string | null;
  age: string | null;
  party: string | null;
  purpose: string[];
  acm: string[];
  isSubmit: boolean;
  overlayCnt: number;
  isPermanetSubmit: boolean;
  changeTaste: (data: string[], name: string) => void;
  changeInfo: (data: string, name: string) => void;
  onSubmit: () => void;
  discountOverlayCnt: () => void;
  clearOverlayCnt: (num: number) => void;
  goBack: () => void;
}

export interface CardText {
  _text: string;
}

export interface ContentCardInter {
  id?: number;
  title: CardText;
  firstimage?: CardText;
  contentid?: CardText;
  addr1?: CardText;
  href?: string;
  rate?: number;
  tags?: string[];
  path?: PathObj[];
  stationPath?: PathObj;
  mapx?: CardText;
  mapy?: CardText;
  overview: CardText;
}

export interface PaymentListInter {
  date: string;
  type: string;
  payment: number;
  memo: string;
}
