<div align=center><a href="https://myseoulguide.site"><img src="https://user-images.githubusercontent.com/74864925/129395349-90ca9abc-6b1a-4989-b98a-aadfec7ff383.png"/></a></div>

# <div align=center>My Seoul Guide</div>

#### <div align=center>This is for your trip, This is your Seoul.</div>

<br/>

<div align=center>
<img src="https://travis-ci.org/joemccann/dillinger.svg?branch=master"/>&nbsp;
  <img src="https://img.shields.io/github/stars/noah071610/My-Seoul-Guide?style=social"/>&nbsp;
  <img src="https://img.shields.io/github/watchers/noah071610/My-Seoul-Guide?style=social"/>&nbsp;
</div>

<br/>

<div align=center>
<img src="https://img.shields.io/badge/Photoshop-31A8FF?style=flat-square&logo=adobe-photoshop&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/SCSS-CC6699?style=flat-square&logo=Sass&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/MobX-FF9955?style=flat-square&logo=MobX&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Emotion-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Antd-0170FE?style=flat-square&logo=Ant-design&logoColor=white"/>&nbsp; <br/>
<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/GraphQL-E434AA?style=flat-square&logo=GraphQL&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Apollo-311C87?style=flat-square&logo=Apollo-GraphQL&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Google_Map-4285F4?style=flat-square&logo=Google-Maps&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Babel-F9DC3E?style=flat-square&logo=Babel&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Webpack-8DD6F9?style=flat-square&logo=Webpack&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Github_Page-181717?style=flat-square&logo=Github&logoColor=white"/>&nbsp;
<img src="https://img.shields.io/badge/Heroku-430098?style=flat-square&logo=Heroku&logoColor=white"/>&nbsp;
</div>

<br/>

<div align=center>
  <a href="https://github.com/noah071610" target="_blank"><img src="https://image.flaticon.com/icons/png/24/25/25657.png"/></a>&nbsp;
  <a href="https://www.instagram.com/salmonchobab" target="_blank"><img src="https://image.flaticon.com/icons/png/24/1409/1409946.png"/></a>&nbsp;
  <a href="mailto:noah071610@gmail.com"><img src="https://image.flaticon.com/icons/png/24/552/552486.png"/></a>&nbsp;
  <a href="https://jshyunsoo.site" target="_blank"><img src="https://image.flaticon.com/icons/png/24/3135/3135715.png"/></a>&nbsp;
</div>

<br/>

<div align=center>
  <a href="https://myseoulguide.site"><img src="https://img.shields.io/badge/go_to_website-EFFDFF?style=for-the-badge"/>&nbsp;</a>
</div>

<br/><br/><br/><br/><br/>

## ???? YES, This is your Seoul.

<br/>

2018????????? 2019????????? ??????????????? ????????? ?????? ?????? ????????? ???????????? ????????? ???????????? ??????

???????????? ???????????? ????????? ????????? ????????? ???????????? ?????? ????????? ????????? ?????? ?????? ?????????

???????????? ??? ?????? ????????? ??????????????? ?????????. ?????? ????????? API??? ?????????????????? OPEN API ?????????

????????? ????????? ?????? ?????? ?????? ?????? ??????????????? ??????????????? ????????? ?????? ????????? ????????? ??????

???????????? ??????????????? ????????? ???????????? ????????? ????????? ??? ????????? ??? ?????? ?????????????????????

??????????????????

<br/><br/>

## ???? ???????????? ?????? ??????

<br/>

- ???????????? : 2021/4 ~ 2021/6
- ????????? : ????????? (Noah) ??? 0???
- ??????????????? : ????????? , ??????????????? , ????????? , ??????
- ?????? : English (?????????????????????????????????????????????????????? ????)
- ????????? ??? ?????????

<br/><br/>

## ???? Let's go into Center of Seoul.

<br/><br/>

### 1. ???????????? ????????? ????????? ???????????? ????????? ?????? ????????? ?????? ?????? ?????? ???????????????.

- ???????????? ????????? ??????????????? ?????? ?????? ??? ?????? ??????????????? ????????????????????? ???????????????.
  <br/>

<div align=center>
  <img src="https://jshyunsoo.site/images/myseoulguide/myseoulguide_landing1.png" alt="myseoulguide_landing1"/>
  <img src="https://jshyunsoo.site/images/myseoulguide/myseoulguide_landing2.png" alt="myseoulguide_landing2"/>
</div>

<br/>

### 2. ????????? ?????? ???????????? ??? ?????? ???????????? ???????????????.

- ???????????? ????????? ????????? ???????????? ????????? ????????? ????????? ????????? ???????????? ???????????? ??????2?????? ???????????????.

```javascript
????store.ts

  onSubmit: action(() => {
    const map = new Map();
    const recommendsArr: string[] = [];
    //???????????? ?????? ????????? ???????????????.
    let userInfo = {
      //????????????????????? ????????????????????? typeScript??? !??? ??????????????????.
      gender: checkListStore.gender!,
      age: checkListStore.age!,
      party: checkListStore.party!,
      acm: [...checkListStore.acm],
      purpose: [...checkListStore.purpose],
    };

    //????????? ????????? ????????? ????????? ???????????? ????????? ?????? ???????????????.
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

    //?????? ????????? ????????? ????????? ????????????.
    let userPick = [...userInfo.purpose, ...userInfo.acm, userInfo.age];

    //?????? ????????? ?????? ???????????? ID??? value????????? ???????????????.
    const places = valueList.map((v) => {
      return { id: v.id, valueList: v.values.sort() };
    });

    //=========== Recommend Stay finder start =================

    // ???????????? ??? ???????????? ????????? ?????????????????????. ??????????????? ???????????? ????????? ???????????? ??????????????? ??? ????????????.
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

    //????????? ?????? ??????????????? ???????????? ???????????? ?????? id??? cnt(????????????)??? ??????????????? cnt????????? ????????? ???????????????.
    let rankPlace = Array.from(map, ([id, cnt]) => ({ id, cnt })).sort((a, b) => b.cnt - a.cnt);

    //===== special Key ======
    //???????????? ????????? ???????????? ????????? rankPlace?????? ?????? ?????? ????????? ???????????????.
    //??????????????? ????????? ????????????????????????. ???????????? ?????????.  Native Recommendation ????????? ????????? ????????????????????????.
    //?????? ???????????? ????????? ???????????????????? ????????? ???????????? ???????????? ????????? ?????????.
    if (checkListStore.purpose.includes("Native Recommendation")) {
      rankPlace = rankPlace.filter((v) => v.id !== 1);
    }
    //????????? ????????? ???????????????. ????????? ???????????? ????????? ????????? ????????? ????????????.
    if (checkListStore.purpose.includes("Plastic surgery")) {
      rankPlace.unshift(rankPlace.splice(rankPlace.map((v) => v.id).indexOf(3), 1)[0]);
    }

    //?????? ????????? ??????????????? ????????? ?????? 2?????? ?????? ?????? ????????????.
    let solution = rankPlace.slice(0, 2).map((v) => {
      return placeList[v.id - 1];
    });

    solution.forEach((v, i) => (v.point = rankPlace[i].cnt));

    //=================^^ Recommend Stay finder done. ^^=====================
```

<br/>

### 3. ????????? ?????? ??? ???????????? ??? ???????????? ???????????????.

- ???????????? ?????? ??????????????? ????????? ????????? ???????????? Home , Accomodation , Attraction ???????????? ?????? ?????? ?????? ?????? ??? ??????????????? ?????? ??? ??? ????????????.

<div align=center>
<img src="https://jshyunsoo.site/images/myseoulguide/myseoulguide_main_modal.jpg" alt="myseoulguide_main_modal"/>
  <img src="https://jshyunsoo.site/images/myseoulguide/myseoulguide_attraction_select.gif" alt="myseoulguide_attraction_select"/>
  <img src="https://jshyunsoo.site/images/myseoulguide/myseoulguide_attraction_page.gif" alt="myseoulguide_attraction_page"/>
  <img src="https://jshyunsoo.site/images/myseoulguide/myseoulguide_acm_select.jpg" alt="myseoulguide_acm_select"/>
  </div>

```javascript

  ????ActivityModal.tsx

    export const ActivityModal = observer(() => {
      const onClickCard = useCallback((arg: TogoRecommedInter) => {
        //?????? ???????????? ???????????? ?????????????????? ???????????? ???????????? ?????????.
        const form = {
          path: { lat: parseFloat(arg.mapy._text), lng: parseFloat(arg.mapx._text) },
          title: arg.title._text,
          contentid: arg.contentid._text,
        };
        if (mainStore.togoLists.find((togo) => togo.contentid === form.contentid)) {
          //?????? ?????? ????????? ???????????? ?????? ??????????????? ??????????????? ???????????????.
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

<br/>

### 4. HOME?????? ?????? ?????? ??? ???????????? ????????? ????????? ??????????????????.

- ??????????????? ???????????? ?????? ??????, ???????????? ????????????, Attractions ???????????? ?????? ????????? ???????????????

<br/>

<div align=center><img src="https://jshyunsoo.site/images/myseoulguide/myseoulguide_main_map.gif" alt="myseoulguide_main_map"/></div>

```javascript


  ????Home.tsx

          ...

    <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_CLIENT_ID as string}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={
            // ??????????????? ??????????????? ????????? ????????? ???????????? center ????????? ????????????.
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
                  <span>????</span>
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
                        <span>????</span>
                      </Preview>
                    </Popover>
                  </OverlayView>
                );
              })}
            {toPlacePath && (
              // Direction ????????? ???????????? ???????????? ?????? ????????? ??????????????? ????????????????????????.
              <Directions origin={mainStore.place?.stationPath} destination={toPlacePath} />
            )}
          </GoogleMap>
        </LoadScript>


```

<br/>

### 5. ?????? ???????????? ??? ??????????????? ????????? ????????? ??? ????????? ????????? ????????? ????????? ??? ????????????.

- ?????? ??? API??? ?????????????????? ??????????????? ????????? ?????? ????????? ?????? ?????? ???????????????.

<br/>

<div align=center><img width="700px" src="https://jshyunsoo.site/images/myseoulguide/myseoulguide_acm_page.png" alt="myseoulguide_acm_page"/><img src="https://jshyunsoo.site/images/myseoulguide/myseoulguide_route_page.gif" alt="myseoulguide_route_page"/></div>

```javascript
  ????MapPage.tsx

    const AcmAndRoutePage: FC = observer(() => {
      const { path } = useRouteMatch();
      // useRouteMatch ??? ????????? Accommodation ???????????? Airport ???????????? ???????????????.
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


```

<br/>

### 6. Analyzer ??????????????? ????????? ????????? ????????? ??? ????????????.

- ????????? ???????????? ????????? ???????????? ??????????????? ???????????? ???????????? ?????? ????????? ???????????????.

<br/>

<div align=center><img src="https://jshyunsoo.site/images/myseoulguide/myseoulguide_analyzer_setting.gif" alt="myseoulguide_analyzer_setting"/><img src="https://jshyunsoo.site/images/myseoulguide/myseoulguide_analyzer_ledger.gif" alt="myseoulguide_analyzer_ledger"/></div>

```javascript

  ????LedgerModal.tsx

    const LedgerModal = observer(
      ({ currentExchage, isModalVisible, setIsModalVisible }: AnalyzerContentProps) => {
        const [memo, onChangeMemo, setMemo] = useInput("");
        const [payment, onChangePayment, setPayment] = useInput(null);
        const [select, setSelect] = useState("");
        const onChangeSelect = useCallback((value: string) => {
          setSelect(value);
        }, []);

        const onSubmit = useCallback(() => {
          //????????? ?????? ????????? ????????? ????????? ???????????????.
          if (!payment || !select) {
            message.error("Please fill contents up");
            return;
          }
          // ????????? ?????? ???????????? ????????????.
          const date = new Date();
          const year = date.getFullYear();
          const month = ("0" + (1 + date.getMonth())).slice(-2);
          const day = ("0" + date.getDate()).slice(-2);
          let form = {
            date: year + "/" + month + "/" + day,
            type: select,
            // ??????????????? ???????????? API??? ???????????? USD ??? KRW??? ???????????????.
            // ??????api??? https??? ???????????? ???????????? ?????? ????????? ??????????????? ????????? ?????????????????? 1 USD = 1300 KRW ???????????? ???????????????
            // ?????? ????????? ??????????????? ?????????????????? ?????????????????????. (????????? : 2021/06/04)
            payment: useExchageClac(payment, currentExchage),
            memo,
          };
          // ???????????? store??? ???????????????.
          analyzerStore.addPaymentList(form);
          setMemo("");
          setPayment("");
        }, [currentExchage, memo, payment, select, setMemo, setPayment]);

        return (
          <LedgerModalComponent
            title="Ledger"
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={false}
            className="analyzer_input"
          >

          ....


```

<br/><br/><br/>

## ???? What made you to go Seoul?

<br/>

> ???? : GraphQL ?????????????

RestAPI??? ??????????????? ????????????????????? ?????????????????? OPEN API?????? ?????? ????????????????????????. ?????? ???????????? ????????? GraphQL??? ??????????????? ?????????????????? ????????? ?????? ???????????????, Express ??? NestJS?????? ???????????? ?????? ????????? ????????? ?????? ??? ???????????????.

<br/>

> ???? : ?????? ??????????????? GraphQL??? ????????? ????????? ??? ?????????????

???????????? API????????? ?????? AWS EC2 ????????? ??????????????? ??????????????? ??????????????? ?????? ???????????? ???????????????, ?????? ??? ???????????? ???????????? ????????? Heroku??? ????????? ?????? ??????????????? ??????????????????.
??????????????? ?????? ????????? ???????????? Heroku??? ??????????????? ???????????????????????? ??????????????? ???????????? ???????????????.

<br/>

> ???? : ???????????? ?????????????????? ????????? ??????????

??????????????? ??????????????? ????????? ???????????? ?????? ????????? ????????? ???????????????. ????????? ??????????????? ???????????? ????????? ????????? ???????????? ??????????????? ???????????? ????????? ??????????????? ????????? ?????? ???????????????. ?????? ?????? ??????????????? ???????????? ??????????????? ????????? ???????????? ???????????? ???????????? ????????????????????? ????????? ???????????? ???????????? ??????????????????. ????????????????????? 'Fall IN Asia' ????????? ????????? ???????????? API ?????? ????????? ?????? ?????? ????????? MapBox??? ??????????????????.

<br/>

> ???? : Redux VS MobX

MobX??? ???????????? ?????? ????????? ??????????????? Redux?????? ????????? DevTool??? ?????? ??????????????? ???????????? Saga ??? Thunk ?????? ?????????????????? ?????? ???????????? ???????????? ?????????????????????. ????????? ??????????????? MobX???, ???????????? ???????????? Redux??? ???????????? ????????????. ?????? ????????? ???????????? ????????????????????????. ????????????????????? 'Fall IN Asia' ????????? ????????? Data Fetching ?????????????????? SWR??? Redux??? ???????????? ???????????? Redux-toolkit??? ???????????? ??????????????????.

<br/><br/><br/>

## ???? Why pronunciation of Seoul is similar to Soul?

<br/>

> ???? : ???????????? ??? ???????????? ????????? ?????????????

<br/>

- API ????????? ????????? ???????????? ?????? ??????????????????. ?????? ?????????????????? ???????????? ????????? ?????????.

- Emotion ?????????????????? ?????? CRA??? ??????????????? ??????????????? ????????? ????????? ?????? CRA??? ???????????? craco ???????????? ?????? ???????????????.

- ??????(navigation)??? ????????? ????????? ??????????????? ???????????? ???????????? ????????? ???????????? ????????? ?????????????????? ????????? ????????? ??????????????? ????????? ?????? ????????? ???????????????. ?????? ???????????? 'Fall In Asia'????????? ????????? ??????????????? ???????????? ?????? ????????? ??????????????? ??????????????????.

- ????????? ??????????????? ??????????????? ????????? ???????????? ????????? ????????? ???????????? ???????????? ???????????????. ?????? ???????????? ?????? ??? ???????????? ???????????? ????????? ?????? ?????? ????????? ????????????. ?????? ???????????? 'Fall In Asia'????????? ??????????????? ??????????????? ???????????? ????????????????????? ????????? ?????? ??????????????? ??????????????? ??????????????????.

- SCSS??? ??????????????? CSS-in-JS ??? ??????????????? ????????????????????? ???????????? ?????? ????????? ????????? ??????????????????. ?????? ???????????? ????????? ???????????? ????????? ????????? ?????????????????? ??? ???????????? ???????????? ???????????????. ?????? ?????? ???????????? 'Fall IN Asia' ?????? Emotion??? TailWindCSS??? ?????? CSS-in-JS??? ??????????????????.

<br/><br/><br/>

## ???? Before you go back your place from Seoul.

<br/>

> ???? : ???????????????!

#### <a href="https://myseoulguide.site">????????????????????? ????????????</a>

<br/>

> ???? : ???????????? ????????? ???????????????

<br/>

| Date       | Version | Update                                                         |
| ---------- | ------- | -------------------------------------------------------------- |
| 2020/06/04 | v1.0    | Final Update for first deployment through AWS                  |
| 2020/08/13 | v1.1    | Optimizated Components ,Stylesheet and Rebuild Attraction page |
| 2020/11/08 | v2.0    | Move GraphQL Server from EC2 to Heroku                         |

<br/>

> ???? : ??????????????? ?????? ?????????????

<br/>

???????????? ?????? ?????? ??????????????? ?????????.

???????????? ???????????? noah071610@gmail.com ?????? ???????????? ????????? ???????????????.

<br/><br/><br/>
