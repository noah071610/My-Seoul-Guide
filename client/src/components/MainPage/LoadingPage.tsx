import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { FC, memo } from "react";
import MainPageWrapper from "./MainPageWrapper";

const antIcon = <LoadingOutlined style={{ fontSize: "12rem" }} spin />;

const LoadingPage: FC = memo(() => {
  return (
    <MainPageWrapper>
      <div className="loadingPage">
        <Spin indicator={antIcon} />
      </div>
    </MainPageWrapper>
  );
});

export default memo(LoadingPage);
