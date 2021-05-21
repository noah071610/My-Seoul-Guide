import { LoadingOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Spin } from "antd";
import { FC, memo } from "react";
import MainPageWrapper from "./MainPageWrapper";

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const antIcon = <LoadingOutlined style={{ fontSize: "12rem" }} spin />;

const LoadingPage: FC = memo(() => {
  return (
    <MainPageWrapper>
      <Loading>
        <Spin indicator={antIcon} />
      </Loading>
    </MainPageWrapper>
  );
});

export default memo(LoadingPage);
