import { LoadingOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Spin } from "antd";
import MainLayout from "./Layout";

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const antIcon = <LoadingOutlined style={{ fontSize: "12rem" }} spin />;

const LoadingPage = () => {
  return (
    <MainLayout>
      <Loading>
        <Spin indicator={antIcon} />
      </Loading>
    </MainLayout>
  );
};

export default LoadingPage;
