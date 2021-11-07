import MainLayout from "../Layout/index";
import { ContentCardInter } from "types";
import { match, useRouteMatch } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { AttractionList, PagenationBtnWrapper } from "./styles";
import AttractionCard from "../Commons/AttractionCard";
import axios from "axios";

const ActivityContent = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageType, setPageType] = useState<number>(76);
  const [activityData, setActivityData] = useState<Array<ContentCardInter> | null>(null);
  const router: match<{ category: string }> = useRouteMatch();
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

  useEffect(() => {
    axios(
      `/openapi/service/rest/EngService/areaBasedList?ServiceKey=${process.env.REACT_APP_TOUR_SERVICE_KEY}&contentTypeId=${pageType}&areaCode=1&sigunguCode=&cat1=A02&cat2=&cat3=&listYN=Y&MobileOS=ETC&MobileApp=TourAPI3.0_Guide&arrange=B&numOfRows=12&pageNo=${pageNumber}`,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/xml; charset=utf-8",
        },
        withCredentials: true,
      }
    ).then((res: any) => {
      setActivityData(
        res.data.response.body.items.item.map((v: any) => {
          return {
            title: { _text: v.title },
            firstimage: { _text: v.firstimage },
            contentid: { _text: v.contentid },
            addr1: { _text: v.addr1 },
            mapx: { _text: v.title },
            mapy: { _text: v.title },
          };
        })
      );
    });
  }, [pageNumber, pageType]);

  const onClickNext = useCallback(() => {
    setPageNumber((prev) => ++prev);
  }, []);
  const onClickPrev = useCallback(() => {
    setPageNumber((prev) => --prev);
  }, []);

  return (
    <MainLayout>
      <AttractionList>
        {activityData?.map((card: ContentCardInter, i: number) => {
          return <AttractionCard key={i} card={card} />;
        })}
      </AttractionList>
      <PagenationBtnWrapper>
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
      </PagenationBtnWrapper>
    </MainLayout>
  );
};

export default ActivityContent;
