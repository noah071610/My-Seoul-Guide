import convert from "xml-js";
import dotenv from "dotenv";
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
