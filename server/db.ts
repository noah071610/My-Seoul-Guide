import * as convert from "xml-js";
import * as dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

const getItems = async (typeNum: number) => {
  const contents = await fetch(
    `http://api.visitkorea.or.kr/openapi/service/rest/EngService/areaBasedList?ServiceKey=${process.env.TOUR_SERVICE_KEY}&contentTypeId=${typeNum}&areaCode=1&sigunguCode=&cat1=A02&cat2=&cat3=&listYN=Y&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&arrange=B&numOfRows=12&pageNo=1`
  )
    .then((res) => res.text())
    .then((data) => {
      let contents = JSON.parse(convert.xml2json(data, { compact: true })).response.body.items;
      return contents;
    });
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

const getOverViews = async (typeNum: number, contents: any) => {
  let b = [];
  console.log("ss");

  let a = () => {
    for (let i = 0; i < contents.length; i++) {
      const a = getContentCode(typeNum, contents, i);
      console.log(a);
    }
  };
  a();
};

const getContentCode = async (typeNum: any, contents: any, i: any) => {
  return fetch(
    `http://api.visitkorea.or.kr/openapi/service/rest/EngService/detailCommon?ServiceKey=${process.env.TOUR_SERVICE_KEY}&contentTypeId=${typeNum}&contentId=${contents.item[i].contentid._text}&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&&overviewYN=Y`
  )
    .then((res) => res.text())
    .then((data) => {
      let content = JSON.parse(convert.xml2json(data, { compact: true })).response.body.item;
      return content;
    });
};

export { getItems, getOverViews };
