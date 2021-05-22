import { observer } from "mobx-react";
import MainPageWrapper from "../MainPageWrapper";
import ContentCard from "../_Common/ContentBox";
import { useQuery, gql } from "@apollo/client";
import { ContentCardInter } from "../../../types";
import { useRouteMatch } from "react-router";
import { useEffect, useState } from "react";
import LoadingPage from "../LoadingPage";

const ActivityContent = observer(() => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageType, setPageType] = useState<number>(76);
  const router: any = useRouteMatch();
  useEffect(() => {
    const category = router.params.category;
    if (category === "popular") {
      setPageType(85);
      return;
    } else if (category === "facilities") {
      setPageType(78);
      return;
    } else if (category === "experience") {
      setPageType(76);
    }
  }, [router]);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        setPageNumber((prev) => prev++);
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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

  const { loading, error, data, previousData } = useQuery(GET_CONTENTS, {
    variables: {
      pageNumber,
      pageType,
    },
  });
  if (loading) return <LoadingPage />;
  if (error) return <p className="error">Error :(</p>;
  return (
    <MainPageWrapper>
      {previousData?.ActivityCards.map((card: ContentCardInter, i: number) => {
        return <ContentCard key={i} card={card} />;
      })}
      {data.ActivityCards.map((card: ContentCardInter, i: number) => {
        return <ContentCard key={i} card={card} />;
      })}
    </MainPageWrapper>
  );
});

export default ActivityContent;
