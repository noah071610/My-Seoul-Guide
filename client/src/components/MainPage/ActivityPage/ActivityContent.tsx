import MainPageWrapper from "../MainPageWrapper";
import ContentCard from "../_Common/ContentBox";
import { useQuery, gql } from "@apollo/client";
import { ContentCardInter } from "../../../types";
import { useRouteMatch } from "react-router";
import { useCallback, useEffect, useState } from "react";
import LoadingPage from "../LoadingPage";
import styled from "@emotion/styled";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { BLUE_COLOR, GRAY_COLOR } from "../../../config";

const Pagenation = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem 2rem 2rem 2rem;
  .btn-prev {
    &:hover {
      color: ${BLUE_COLOR};
    }
    margin-right: 1rem;
    span {
      margin-right: 1rem;
    }
  }
  .btn-next {
    &:hover {
      color: ${BLUE_COLOR};
    }
    span {
      margin-left: 1rem;
    }
  }
  .btn-none {
    user-select: none;
    color: ${GRAY_COLOR};
    margin-right: 1rem;
    span {
      margin-right: 1rem;
    }
  }
`;

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
      overview {
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
  const router: any = useRouteMatch();
  useEffect(() => {
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
