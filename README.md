
<div align=center><a href="https://github.com/noah071610/My-Seoul-Guide"><img src="https://media.vlpt.us/images/noah071610/post/bcf1258c-eac3-4972-a17d-874565c90141/image.png"/></a></div>

# <div align=center>My Seoul Guide</div>
#### <div align=center>This is for your trip, This is your Seoul.</div>
<div align=center><img src="https://travis-ci.org/joemccann/dillinger.svg?branch=master"/></div>
<br/>
<div align=center><img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>&nbsp
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/>&nbsp
<img src="https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=Sass&logoColor=white"/>&nbsp
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>&nbsp
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/>&nbsp
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>&nbsp <br/>
<img src="https://img.shields.io/badge/MobX-FF9955?style=flat-square&logo=MobX&logoColor=white"/>&nbsp 
<img src="https://img.shields.io/badge/Emotion-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>&nbsp
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node-dot-js&logoColor=white"/>&nbsp
<img src="https://img.shields.io/badge/GraphQL-E434AA?style=flat-square&logo=GraphQL&logoColor=white"/>&nbsp
</div>
<br/><br/><br/><br/>

## 🎉 YES, This is your Seoul.
#### 코로나라는 아픔을 이겨내고 한국에 다시 방문하게될 외국인들을 위한 웹 가이드 어플리케이션.
<br/>

> 🎤 : 만든 이유가 뭔가요? 

호텔매니저와 국가통역안내사를 토대로 관광통역업무를 겸하며 많은 외국인들이 생각보다 많은 외국인들이 잘못된 정보를 접하는걸 보게 되었습니다.
놀기도 부족한 시간과 아까운 돈을 낭비하는 그들의 고충을 덜고 자랑스런 대한민국의 서울을 알리고자 웹 사이트를 개발했습니다.


> 🎤 : 웹은 영문인데 Read Me 는 한국어군요?

한국에서 개발자로 취업을 희망하며 포트폴리오를 작성중이라 한국어로 작성했습니다. 추후 이용자용 안내서는 영문 또는 일본어로 제작 할 생각입니다.
<br/><br/><br/>
## 🛫 Attention please, We will arrive in Incheon international Airport.
- 제작기간 : 2021/4 ~ 2021/5
- 개발자 : 장현수 (Noah) 외 0명
- 개발포지션 : 디자인 , 프론트엔드 , 백엔드 , 서버
- 언어 : English , (日本語のバージョンは間もなくアップデート予定です 🇯🇵🔜)
<br/><br/><br/>

## 🚝 Let's go into Center of Seoul.
#### 1. 이용자의 취향을 사전에 파악합니다.
<img src="https://user-images.githubusercontent.com/74864925/120032343-0420f300-c035-11eb-882c-8513dc22b996.gif"/>

```javascript
📁store.ts

const checkListStore = observable<CheckListStore>({
  // 체크된 모든 사항은 checkListStore 가 담당합니다.
  age: null,
  gender: null,
  party: null,
  purpose: [],
  // acm 은 accommodation의 약자입니다.
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
```
---
#### 2. 선택한 취향에 맞춘 숙박지역 및 놀거리를 추천합니다.
- 이용자의 취향을 분석해 점수를 매긴후 숙박지역 매칭순위 상위2개의 가져옵니다.
- 놀거리추천을 위해 몇가지 항목은 따로 때서 사전에 분류합니다.

```javascript
📁store.ts

  onSubmit: action(() => {
    const map = new Map();
    const recommendsArr: string[] = [];
    //유저에게 받은 정보를 저장합니다.
    let userInfo = {
      //클라이언트에서 무조건 체크하게 걸러주기때문에 typeScript에 !를 이용했습니다.
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
```
---
#### 3. 웹 어플 시작전 이용자에게 숙박지역 및 놀거리를 추천합니다.
- 모달은 overlay를 클릭시 4부터 시작하는 카운트를 차감해 카운트가 0이 되면 사라지고 카운트가 되지 않습니다.
- 추천 숙박지역 및 놀거리 선택 시 메인페이지의 구글맵에 자동 반영됩니다.
```javascript
📁server/db.ts
const getActivities = async (typeNum: number, pageNum: number) => {
  const contents = await fetch(
    `http://api.visitkorea.or.kr/openapi/service/rest/EngService/
    areaBasedList?ServiceKey=${process.env.TOUR_SERVICE_KEY}....`
  )
    .then((res) => res.text())
    .then((data) => {
      // XML을 JSON으로 바꿔줍니다. xml2json 라이브러리를 사용했습니다.
      let contents = JSON.parse(convert.xml2json(data, { compact: true })).response.body.items;
      return contents;
    });
  // 명소에대한 설명은 content id가 필요해 다시 쿼리를 보내는 것 말고는 방법이 없었습니다.
  for (let i = 0; i < contents.item.length; i++) {
    const getOneOverview = await fetch(
      `http://api.visitkorea.or.kr/openapi/service/rest/EngService/detailCommon.....
    )
      ...
      
    contents.item[i].overview = getOneOverview;
  }
  return contents.item;
};

==================================================================================================
📁server

  ...
  
  type Query {
    ActivityCards(typeNum: Int!, pageNum: Int!): [ActivityObj]
    FoodRecommendCards(isFood: Boolean!): [RecommendObj]
    ShoppingRecommendCards(isShopping: Boolean!): [RecommendObj]
    NearRecommendCards(mapx: Float!, mapy: Float!): [RecommendObj]
  }
`;

//서버에 그래프큐엘을 이용합니다.
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

==================================================================================================
📁PlaceModal.tsx

<ul className="placeTags">
  {mainStore.userInfo?.purpose.concat(mainStore.userInfo?.acm).map((v, i) => (
    //추천 숙박지역 2곳과 점수를 나타내어 줍니다.
    <li className="tag" key={i}>
      {v}
    </li>
  ))}
</ul>

==================================================================================================
📁ActivityModal.tsx

export const ActivityModal = observer(() => {
  const onClickCard = useCallback((arg: TogoRecommedInter) => {
    //추천 놀거리를 클릭하면 메인페이지의 구글맵에 반영되게 합니다.
    const form = {
      path: { lat: parseFloat(arg.mapy._text), lng: parseFloat(arg.mapx._text) },
      title: arg.title._text,
      contentid: arg.contentid._text,
    };
    if (mainStore.togoLists.find((togo) => togo.contentid === form.contentid)) {
      //만약 이미 체크한 상태에서 다시 클릭한다면 리스트에서 삭제합니다.
      mainStore.deleteTogoList(form.contentid);
    } else {
      mainStore.addTogoList(form);
    }
  }, []);
  const { loading, error, data } = useQuery(GET_RECOMMEND, {
    variables: {
      ...
    },
  });
  
  return (
  
    ...
    
    <div className="recommend_container">
        {useSortList({ data: data, isKpop: mainStore.userInfo?.purpose.includes("K-pop") })?.map(
          (v: TogoRecommedInter, i: number) => (
            <div key={i} onClick={() => onClickCard(v)} className="recommend_card">
              <img
                className="recommend_img"
                src={v.firstimage?._text || NO_IMAGE_URL}
                alt={v.firstimage?._text || "no_image"}
              />
              <h4>{v.title._text}</h4>
              {mainStore.togoLists.find((togo) => togo.contentid === v.contentid._text) && (
                <img
                  alt="checked"
                  className="recommend_checked"
                  src="https://img.icons8.com/emoji/48/000000/check-box-with-check-emoji.png"
                />
              )}
            </div>
          )
        )}
      </div>
      
      ...
      
```
---
#### 3. 선택한 추천숙박지역과 추천놀거리에 기반해 Home 안 구글맵 api에 OverlayView를 표시합니다.
- 지정 숙박지역으로 부터 선택 놀거리까지의 경로를 탐색할 수 있습니다.
- 지정 숙박지역은 Accommodation 메뉴에서 변경 가능합니다 *추천하진않지만 airport 메뉴에서도 변경 가능합니다.
- 지정 놀거리는 삭제 가능하며, Attractions 메뉴에서 추가 가능합니다 (이메뉴는 초기의 추천기반이아닌 한국관광공사의 인기+카테고리 기반입니다.)
```jsx
📁Home.tsx

      ...

      <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_CLIENT_ID as string}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={
                mainStore.place?.stationPath || { lat: 37.549687466128496, lng: 126.9809660539474 }
              }
              zoom={12}
            >
              {mainStore.place && (
                <OverlayView
                  position={mainStore.place?.stationPath}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <Preview>
                    <h3>Your base place</h3>
                    <h4>{mainStore.place?.title._text}</h4>
                    <span>🌟</span>
                  </Preview>
                </OverlayView>
              )}
              {mainStore.togoLists.length > 0 &&
                mainStore.togoLists.map((v, i) => {
                  return (
                    <OverlayView
                      key={i}
                      position={v.path}
                      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                      <Popover content={() => togoPopup(v.contentid, v.path)}>
                        <Preview>
                          <h3>List No.{i + 1}</h3>
                          <h4>{v.title}</h4>
                          <span>📍</span>
                        </Preview>
                      </Popover>
                    </OverlayView>
                  );
                })}
              {toPlacePath && (
                <Directions origin={mainStore.place?.stationPath} destination={toPlacePath} />
              )}
            </GoogleMap>
          </LoadScript>
          <div
            style={checkListStore.overlayCnt === 0 ? { display: "none" } : { display: "block" }}
            onClick={() => checkListStore.discountOverlayCnt()}
            className="overlay"
          />
          <HomeModal />
          
          ...
          
```

#### 4. 메뉴는 Accommodation / Airport / Attractions / Analyzer 가 있습니다. 
- 지정 숙박지역은 Accommodation 메뉴에서 변경 가능합니다.
- 공항에서 숙박지역까지의 경로를 Airport 메뉴에서 탐색합니다. (숙박지역 변경도 가능합니다.)
- 놀거리 추가 및 탐색은 Attractions 메뉴에서 가능합니다.
- 여행장부 및 소비계획은 Analayzer 메뉴에서 가능합니다.
```javascript
📁MapPage.tsx

const AcmAndRoutePage: FC = observer(() => {
  const { path } = useRouteMatch();
  let isAirportRoutePath = path.slice(1) === "airport_route";
  const [center, setCenter] = useState<PathObj>({
    lat: 37.517146640932296,
    lng: 126.80792769408053,
  });

  useEffect(() => {
    if (!isAirportRoutePath && mainStore.place) {
      let centerXY = useCalcCenter(mainStore.place?.path as PathObj[]);
      //doubleCheck
      setCenter(centerXY);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAirportRoutePath, mainStore.place]);

  return (
    <MainPageWrapper>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_CLIENT_ID as string}>
        <GoogleMap
          mapContainerClassName={isAirportRoutePath ? "map_route" : "map_acm"}
          center={center}
          zoom={isAirportRoutePath ? 10 : 13}
        >
          {isAirportRoutePath ? (
            //You can see direction when you pick airport up
            mainStore.airport && (
              <Directions
                origin={{
                  lat: mainStore.airport.path.lat,
                  lng: mainStore.airport.path.lng,
                }}
                destination={{
                  lat: mainStore.destination?.stationPath.lat,
                  lng: mainStore.destination?.stationPath.lng,
                }}
              />
            )
          ) : (
            //Polygon map area for acm page
            <Polygon paths={mainStore?.place?.path} options={polygonOption} />
          )}
        </GoogleMap>
      </LoadScript>
      {isAirportRoutePath ? (
        <AirportRouteCards />
      ) : (
        mainStore.place && <PlaceCards card={mainStore.place} isAcmCard={true} />
      )}
    </MainPageWrapper>
  );
});

export default AcmAndRoutePage;


==================================================================================================
📁ActivityContent.tsx

const ActivityContent = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageType, setPageType] = useState<number>(76);
  const router: any = useRouteMatch();
  useEffect(() => {
    //router.params의 값에 따라 보여주는 데이터를 변경합니다.
    const category = router.params.category;
    if (category === "popular") {
      setPageType(85);
    } else if (category === "facilities") {
      setPageType(78);
    } else if (category === "experience") {
      setPageType(76);
    }
    setPageNumber(1);
  }, [router]);

  const onClickNext = useCallback(() => {
    setPageNumber((prev) => ++prev);
  }, []);
  const onClickPrev = useCallback(() => {
    setPageNumber((prev) => --prev);
  }, []);

  const { loading, error, data } = useQuery(GET_CONTENTS, {
    variables: {
      pageNumber,
      pageType,
    },
  });
  if (loading) return <LoadingPage />;
  if (error) return <p className="error">Error :(</p>;

  return (
    <MainPageWrapper>
      {data.ActivityCards.map((card: ContentCardInter, i: number) => {
        return <ContentCard key={i} card={card} />;
      })}
      <Pagenation>
        {pageNumber === 1 ? (
          <span className="btn-none">
            <DoubleLeftOutlined />
            Previous Page
          </span>
        ) : (
          <button onClick={onClickPrev} className="btn-prev btn-underLine">
            <DoubleLeftOutlined />
            Previous Page
          </button>
        )}
        <button onClick={onClickNext} className="btn-next btn-underLine">
          Next Page
          <DoubleRightOutlined />
        </button>
      </Pagenation>
    </MainPageWrapper>
  );
};

export default ActivityContent;
```
