import MainLayout from "../Layout/index";
import { ContentCardInter } from "types";
import { useQuery, gql } from "@apollo/client";
import { match, useRouteMatch } from "react-router";
import { useCallback, useEffect, useState } from "react";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import ErrorPage from "../ErrorPage";
import LoadingPage from "../LoadingPage";
import { AttractionList, PagenationBtnWrapper } from "./styles";
import AttractionCard from "../Commons/AttractionCard";
const GET_CONTENTS = gql`
  query ($pageNumber: Int!, $pageType: Int!) {
    ActivityCards(typeNum: $pageType, pageNum: $pageNumber) {
      contentid {
        _text
      }
      title {
        _text
      }
      firstimage {
        _text
      }
      addr1 {
        _text
      }
      mapx {
        _text
      }
      mapy {
        _text
      }
    }
  }
`;
const ActivityContent = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageType, setPageType] = useState<number>(76);
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
  if (error) return <ErrorPage />;

  return (
    <MainLayout>
      <AttractionList>
        {data.ActivityCards?.map((card: ContentCardInter, i: number) => {
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
