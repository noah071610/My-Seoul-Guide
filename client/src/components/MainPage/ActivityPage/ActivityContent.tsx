import { observer } from "mobx-react";
import MainPageWrapper from "../MainPageWrapper";
import ContentCard from "../_Common/ContentBox";
import { useQuery, gql } from "@apollo/client";
import { ContentCardInter } from "../../../types";
import { useRouteMatch } from "react-router";
import { useEffect, useState } from "react";
import LoadingPage from "../LoadingPage";

const ActivityContent = observer(() => {
  const [pageNumber, setPageNumber] = useState(0);
  const [pageType, setPageType] = useState(76);
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

  const GET_CONTENTS = gql`
    query {
      ActivityCards(typeNum: ${pageType}) {
        contentid{
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
        mapx{
          _text
        }
        mapy{
          _text
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_CONTENTS);
  if (loading) return <LoadingPage />;
  if (error) return <p className="error">Error :(</p>;
  return (
    <MainPageWrapper>
      {data.ActivityCards.map((card: ContentCardInter, i: number) => {
        return <ContentCard key={i} card={card} />;
      })}
    </MainPageWrapper>
  );
});

export default ActivityContent;
