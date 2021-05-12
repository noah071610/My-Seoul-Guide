/** @jsxImportSource @emotion/react */
import axios from "axios";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { mainStore } from "../../../@store/store";
import MainPageWrapper from "../MainPageWrapper";
import ContentCard from "../_Common/ArticleBox";

const ActivityContent = observer(() => {
  useEffect(() => {
    axios.get(`http://localhost:5000/api/85/A02`).then((res) => {
      console.log(res);
    });
    // axios
    //   .get(
    //     "http://api.visitkorea.or.
    //   )
    //   .then((res) => console.log(res));
  }, []);
  return (
    <MainPageWrapper>
      <ContentCard />
    </MainPageWrapper>
  );
});

export default ActivityContent;
