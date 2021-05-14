export const WHITE_COLOR = "#fff" as const;
export const BLUE_COLOR = "#1187cf" as const;
export const GRAY_COLOR = "rgba(0, 0, 0, 0.25)" as const;
export const RED_COLOR = "#d21f3c" as const;
export const MAIN_COLOR = "#263238" as const;
export const ORANGE_COLOR = "#ed6f63" as const;

export const SM_SIZE = "576px" as const;
export const MD_SIZE = "768px" as const;
export const LG_SIZE = "992px" as const;

export let page_images = [
  "https://images.unsplash.com/photo-1588458746815-e957c89f3a1e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  "https://images.unsplash.com/photo-1533637324006-841a6da5300e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  "https://images.unsplash.com/photo-1574442274210-ba4925b7ae61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
];

export const check_purpose_list = [
  { label: "K-pop", value: "kpop" },
  { label: "Food", value: "food" },
  { label: "Shopping", value: "shopping" },
  { label: "History", value: "history" },
  { label: "Night Life", value: "nightLife" },
  { label: "Chillin", value: "chillin" },
  { label: "Activity", value: "activity" },
  { label: "Plastic surgery", value: "surgery" },
];
export const check_party_list = ["Single", "Family", "Friend", "Lover"];
export const check_age_list = ["Teenager", "Twenties", "Thirties", "Upper then Forties"];

export const check_acm_list = [
  { label: "Easy to access", value: "access" },
  { label: "Near Airport", value: "airport" },
  { label: "Cheaper", value: "cheaper" },
  { label: "Luxury", value: "luxury" },
  { label: "Native Recommendation", value: "Native" },
];

export const main_nav_list = [
  ["Home 🗺", ""],
  ["Accommodation 🏩", "stay"],
  ["From Airport ✈", "airport_route"],
  ["Attractions 🏂", "activity", "Popular", "Facilities", "Experience"],
  ["Analyzer 📈", "analyzer"],
];

export const polygonOption = {
  fillColor: "red",
  fillOpacity: 0.1,
  strokeColor: "red",
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
};

export const airportList = [
  {
    id: 0,
    name: "Incheon-Airport",
    path: { lat: 37.4480776440891, lng: 126.45117714540771 },
    src: "https://futureiot.tech/wp-content/uploads/2020/04/Incheon-Airport-resized.jpg",
  },
  {
    id: 1,
    name: "Gimpo-Airport",
    path: { lat: 37.56002674165833, lng: 126.80517798548506 },
    src: "https://www.korea.kr/newsWeb/resources/attaches/2018.10/22/I7(4).JPG",
  },
];

export const acmCardList = [
  {
    id: 0,
    title: { _text: "Myeong Dong" },
    firstimage: {
      _text:
        "https://www.lottehotel.com/content/dam/lotte-hotel/lotte/seoul/overview/e-concierge/shopping-performance/190320-4-768-ove-LTSE.jpg.thumb.768.768.jpg",
    },
    href: "https://en.wikipedia.org/wiki/Myeong-dong",
    rate: 3,
    tags: ["Hot Spot", "Shopping", "Easy to Access"],
    overview: {
      _text: `Myeongdong (Korean: 명동; Hanja: 明洞; lit. 'bright cave' or 'bright tunnel') is a dong in
  Jung-gu, Seoul, South Korea between Chungmu-ro, Eulji-ro, and Namdaemun-ro. It covers
  0.99km² with a population of 3,409 and is mostly a commercial area, being one of Seoul's
  main shopping, parade route and tourism districts. In 2011, 2012 and 2013, Myeong-dong was
  listed as the ninth most expensive shopping street in the world. The area is known for its
  two historically significant sites, namely the Myeongdong Cathedral and the Myeongdong
  Nanta Theatre.`,
    },
    path: [
      { lat: 37.56595609511639, lng: 126.98280123418105 },
      { lat: 37.5606401073546, lng: 126.98230034536819 },
      { lat: 37.56126878128578, lng: 126.99302771411011 },
      { lat: 37.56618769591815, lng: 126.99233203520338 },
    ],
    stationPath: { lat: 37.56088294419242, lng: 126.9862827942377 },
  },
  {
    id: 1,
    title: { _text: "Hong Dae" },
    firstimage: {
      _text: "https://ak-d.tripcdn.com/images/22080y000000masslABEB_Z_550_412_R5_Q70_D.jpg",
    },
    href: "https://en.wikipedia.org/wiki/Hongdae%2C_Seoul",
    rate: 5,
    tags: ["Hot Spot", "Shopping", "Young", "Trandy"],
    overview: {
      _text: `Hongdae (Korean: 홍대; Hanja: 弘大) is a neighborhood in Seoul, South Korea near Hongik University, after which it is named. It is known for its urban arts and indie music culture, local shops, clubs and entertainment. The area is located in Mapo-gu in the western end of Seoul, stretching from Seogyo-dong to Hapjeong-dong.`,
    },
    path: [
      { lat: 37.558467606580905, lng: 126.926214844173 },
      { lat: 37.5491498285531, lng: 126.91373409227684 },
      { lat: 37.5478881443036, lng: 126.93937760436947 },
      { lat: 37.555115503395605, lng: 126.93646770228804 },
      { lat: 37.558467606580905, lng: 126.926214844173 },
    ],
    stationPath: { lat: 37.556784402416255, lng: 126.92369675132217 },
  },
  {
    id: 2,
    title: { _text: "Gang Nam" },
    firstimage: {
      _text: "https://image.여기유.com/content_travel/2020021412015815816493185544.jpg",
    },
    href: "https://en.wikipedia.org/wiki/Gangnam_District",
    rate: 4,
    tags: ["Hot Spot", "Shopping", "Young", "Trandy"],
    overview: {
      _text: `Gangnam District (/ˈɡæŋnæm, ˈɡɑːŋnɑːm/; Korean: 강남구; Hanja: 江南區; RR: Gangnam-gu, Korean pronunciation: [kaŋ nam gu]) is one of the 25 local government districts which make up the city of Seoul, South Korea. Gangnam literally means "South of the (Han) River". Gangnam District is the third largest district in Seoul, with an area of 39.5 km2 (15.3 sq mi). As of the 2017 census, Gangnam District had a population of 561,052. There is a high concentration of wealth in the district with prices for an apartment as of 2020 having risen by 83 times in 40 years compared to just 6 times in the rest of Seoul.`,
    },
    path: [
      { lat: 37.509786164443405, lng: 127.01745307074023 },
      { lat: 37.483972555312704, lng: 127.0265837215579 },
      { lat: 37.491217591334106, lng: 127.0547472783053 },
      { lat: 37.51687569235387, lng: 127.04150140458393 },
    ],
    stationPath: { lat: 37.4982578685352, lng: 127.02819123067702 },
  },
  {
    id: 3,
    title: { _text: "Dongdaemun" },
    firstimage: {
      _text:
        "https://pds.joins.com/news/component/htmlphoto_mmdata/201406/29/htm_2014062922222430103011.jpg",
    },
    href: "https://en.wikipedia.org/wiki/Gangnam_District",
    rate: 5,
    tags: ["Hot Spot", "Shopping", "Young", "Trandy"],
    overview: {
      _text: `Dongdaemun District (Korean: 동대문구, romanized: Dongdaemun-gu, "Great Eastern Gate") is one of the 25 districts of Seoul, South Korea.
    Dongdaemun has a population of 346,770 (2010) and has a geographic area of 14.22 km2 (5.49 sq mi), and is divided into 14 dong (administrative neighborhoods). Dongdaemun is located in northeastern Seoul, bordering the city districts of Seongbuk to the northwest, Jongno to the west, Seongdong to the south, Gwangjin to the southeast, and Jungnang to the east.
    Dongdaemun is part of the Seongjeosimni (Outer old Seoul) area and is named after Heunginjimun, one of the Eight Gates of Seoul which is not located within the district. Dongdaemun is home to the University of Seoul, Cheongnyangni station, and to Gyeongdong Market, one of the largest herbal medicine and agricultural markets in South Korea.
    Yoo Deok-yeol (유덕열) of the Democratic Party has been the mayor of Dongdaemun since July 2010.`,
    },
    path: [
      { lat: 37.570809497923314, lng: 127.00206238132061 },
      { lat: 37.563392730843255, lng: 127.00275099500773 },
      { lat: 37.56560820615006, lng: 127.01619921525027 },
      { lat: 37.572800019659596, lng: 127.01551060156314 },
    ],
    stationPath: { lat: 37.57090581471602, lng: 127.0092725716916 },
  },
  {
    id: 4,
    title: { _text: "Itaewon" },
    firstimage: {
      _text:
        "https://3aij0xs1tvo2l5now3runyvz-wpengine.netdna-ssl.com/wp-content/uploads/2013/09/outside_itaewon_station_at_night.jpg",
    },
    href: "https://en.wikipedia.org/wiki/Itaewon",
    rate: 4,
    tags: ["Hot Spot", "Shopping", "Young", "Trandy"],
    overview: {
      _text: `Itaewon is known as the place to go when you want to get your foreign food fix. Restaurants featuring cuisine from all over the world can be found here including Indian, Thai, Pakistani, Greek, German, French, Italian, Australian, English, American, and Mexican, cuisines which are not easily found in Korea. Itaewon is also famous for its nightlife. Among foreigners, it is often considered the most popular area of Seoul for bars and clubs other than Hongdae. A range of drinking establishments can be found here including pubs, wine bars, hip-hop clubs, salsa clubs, lounges and cafes.`,
    },
    path: [
      { lat: 37.53805001667464, lng: 126.98706604077275 },
      { lat: 37.52027367842612, lng: 126.99429532890564 },
      { lat: 37.53044240670676, lng: 127.00929951182299 },
      { lat: 37.54226811995154, lng: 127.0007516742822 },
    ],
    stationPath: { lat: 37.534516720916024, lng: 126.99488640277814 },
  },
  {
    id: 5,
    title: { _text: "Hyehwa" },
    firstimage: {
      _text:
        "http://2.bp.blogspot.com/-ILeMpKHyApE/U0fGvVEUTsI/AAAAAAAALyw/zUc_E4lEutU/s1600/IMG_2371.JPG",
    },
    href: "https://en.wikipedia.org/wiki/Itaewon",
    rate: 4,
    tags: ["Hot Spot", "Shopping", "Young", "Trandy"],
    overview: {
      _text: `Hyehwa-dong is an administrative and legal dong in Jongno-gu, Seoul. Hyehwa-dong is in charge of Hyehwa-dong, Myeongryun 1-ga, Myeongryun 2-ga, Myeongryun 3-ga, and Myeongryun 4-ga. There are many educational institutions, including Sungkyunkwan University, Catholic University, Dongsung High School, Seoul Science High School, Kyungshin High School, and Seoul International High School. The Dong Community Center is the first to use hanok in Korea.`,
    },
    path: [
      { lat: 37.581734326390624, lng: 126.99722747928847 },
      { lat: 37.581952635485756, lng: 127.0020679650297 },
      { lat: 37.58460348055875, lng: 127.00596396574826 },
      { lat: 37.58812739902962, lng: 127.0061213799187 },
      { lat: 37.593210279572, lng: 127.00076929812353 },
      { lat: 37.58965541801568, lng: 126.99195410457853 },
    ],
    stationPath: { lat: 37.58259196558186, lng: 127.00183184377404 },
  },
  {
    id: 6,
    title: { _text: "Yeongdeungpo" },
    firstimage: {
      _text:
        "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F99D0F7465C0DC75425",
    },
    href: "https://en.wikipedia.org/wiki/Yeongdeungpo_District",
    rate: 4,
    tags: ["Hot Spot", "Shopping", "Young", "Trandy"],
    overview: {
      _text: `
      Yeongdeungpo District has been heavily developed as an office, commercial, and residential district. Yeouido Dong is home to DLI 63 Building, the highest office building in South Korea and currently the 3rd tallest building in the country. The National Assembly Building is located in Yeouido-dong. Other organisations, such as the Financial Union of Korea are also based in Yeongdeungpo. There are also mass-media corporations in the area, including; Kookmin Newspaper Corporation; Munhwa Broadcasting Corporation and Korean Broadcasting System.`,
    },
    path: [
      { lat: 37.529381772977786, lng: 126.89168990348853 },
      { lat: 37.5242315974335, lng: 126.88203996183724 },
      { lat: 37.51566322796156, lng: 126.88307171660497 },
      { lat: 37.51099353378798, lng: 126.89260027534242 },
      { lat: 37.51802203455947, lng: 126.91196085010192 },
      { lat: 37.52480920491636, lng: 126.90922973454022 },
    ],
    stationPath: { lat: 37.51551880880889, lng: 126.90613447023699 },
  },
];
