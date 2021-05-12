import * as convert from "xml-js";
import * as dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

const getItems = async (typeNum: number) => {
  return fetch(
    `http://api.visitkorea.or.kr/openapi/service/rest/EngService/areaBasedList?ServiceKey=${process.env.TOUR_SERVICE_KEY}&contentTypeId=${typeNum}&areaCode=1&sigunguCode=&cat1=A02&cat2=&cat3=&listYN=Y&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&arrange=B&numOfRows=12&pageNo=1`
  )
    .then((res) => res.text())
    .then((data) => {
      return JSON.parse(convert.xml2json(data, { compact: true })).response.body.items.item;
    });
};

const getOverViews = async (typeNum: number, idArr: number[]) => {
  let arr = [];
  for (const id of idArr) {
    return fetch(
      `http://api.visitkorea.or.kr/openapi/service/rest/EngService/detailCommon?ServiceKey=${process.env.TOUR_SERVICE_KEY}&contentTypeId=76&${id}=1751264&contentId=1751264&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&&overviewYN=Y`
    )
      .then((res) => res.text())
      .then((data) => {
        let content = JSON.parse(convert.xml2json(data, { compact: true })).response.body.items
          .item;
        arr.push({ content: content.contentid, overview: content.contentid });
      });
  }
};

export { getItems, getOverViews };
