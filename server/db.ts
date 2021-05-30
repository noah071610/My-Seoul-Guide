import * as convert from "xml-js";
import * as dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

const getActivities = async (typeNum: number, pageNum: number) => {
  const contents = await fetch(
    `http://api.visitkorea.or.kr/openapi/service/rest/EngService/areaBasedList?ServiceKey=${process.env.TOUR_SERVICE_KEY}&contentTypeId=${typeNum}&areaCode=1&sigunguCode=&cat1=A02&cat2=&cat3=&listYN=Y&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&arrange=B&numOfRows=12&pageNo=${pageNum}`
  )
    .then((res) => res.text())
    .then((data) => {
      // XML을 JSON으로 바꿔줍니다. xml2json 라이브러리를 사용했습니다.
      let contents = JSON.parse(convert.xml2json(data, { compact: true })).response.body.items;
      return contents;
    });
  // 페이지로 20개의 명소 데이터를 뽑아오는데.... 명소 설명은 content의 아이디가 필요하더라구요.. 따로 다시 쿼리를 보내는 것 말고는 방법이 정말 없었습니다.
  // 사실 그래프큐엘이라서 어떻게 해볼까 생각이라도 들었지, REST API 였으면 오버패칭 지옥이라 이부분은 포기했을거라고 생각합니다.
  for (let i = 0; i < contents.item.length; i++) {
    const getOneOverview = await fetch(
      `http://api.visitkorea.or.kr/openapi/service/rest/EngService/detailCommon?ServiceKey=${process.env.TOUR_SERVICE_KEY}&contentTypeId=${typeNum}&contentId=${contents.item[i].contentid._text}&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&&overviewYN=Y`
    )
      .then((res) => res.text())
      .then((data) => {
        let content = JSON.parse(convert.xml2json(data, { compact: true })).response.body.items
          .item;
        return content.overview;
      });
    contents.item[i].overview = getOneOverview;
  }
  return contents.item;
};

const getFoodRecommends = async (isFood: boolean) => {
  if (isFood) {
    return fetch(
      `http://api.visitkorea.or.kr/openapi/service/rest/EngService/areaBasedList?ServiceKey=${process.env.TOUR_SERVICE_KEY}&contentTypeId=82&areaCode=1&sigunguCode=&cat1=A05&cat2=&cat3=&listYN=Y&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&arrange=P&numOfRows=12&pageNo=1`
    )
      .then((res) => res.text())
      .then((data) => {
        let contents = JSON.parse(
          convert.xml2json(data, { compact: true })
        ).response.body.items.item.slice(0, 3);
        return contents;
      });
  }
};

const getShoppingRecommends = async (isShopping: boolean) => {
  if (isShopping) {
    return fetch(
      `http://api.visitkorea.or.kr/openapi/service/rest/EngService/areaBasedList?ServiceKey=${process.env.TOUR_SERVICE_KEY}&contentTypeId=79&areaCode=1&sigunguCode=&cat1=A04&cat2=A0401&cat3=&listYN=Y&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&arrange=B&numOfRows=12&pageNo=1`
    )
      .then((res) => res.text())
      .then((data) => {
        let contents = JSON.parse(
          convert.xml2json(data, { compact: true })
        ).response.body.items.item.slice(0, 3);
        return contents;
      });
  }
};

const getNearRecommends = async (mapx: number, mapy: number) => {
  return fetch(
    `http://api.visitkorea.or.kr/openapi/service/rest/EngService/locationBasedList?ServiceKey=${process.env.TOUR_SERVICE_KEY}&contentTypeId=&mapX=${mapx}&mapY=${mapy}&radius=2000&listYN=Y&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&arrange=B&numOfRows=12&pageNo=1`
  )
    .then((res) => res.text())
    .then((data) => {
      let contents = JSON.parse(
        convert.xml2json(data, { compact: true })
      ).response.body.items.item.slice(0, 9);
      return contents;
    });
};

export { getActivities, getShoppingRecommends, getFoodRecommends, getNearRecommends };
