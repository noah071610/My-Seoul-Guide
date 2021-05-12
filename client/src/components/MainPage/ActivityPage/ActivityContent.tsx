/** @jsxImportSource @emotion/react */
import { observer } from "mobx-react";
import MainPageWrapper from "../MainPageWrapper";
import ContentCard from "../_Common/ArticleBox";

const ActivityContent = observer(() => {
  return (
    <MainPageWrapper>
      <ContentCard />
    </MainPageWrapper>
  );
});

export default ActivityContent;
