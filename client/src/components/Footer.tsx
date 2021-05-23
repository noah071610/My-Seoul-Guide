import { GithubFilled, InstagramFilled, MailFilled } from "@ant-design/icons";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Popconfirm } from "antd";
import { observer } from "mobx-react";
import { useHistory } from "react-router";
import { checkListStore, mainStore } from "../@store/store";
import { SM_SIZE } from "../config";

const FooterComponent = styled.footer`
  position: fixed;
  width: 100%;
  transition: 0.4s all;
  padding: 1rem 1rem 2rem 1rem;
  right: 0;
  background-color: #fff;
  z-index: 1;
  text-align: end;
  border-bottom: 1px solid $GRAY_COLOR;
  .footer {
    &_list {
      li {
        display: inline-block;
        margin-left: 0.8rem;
        font-size: 1.5rem;
      }
    }
    &_gobackBtn {
      display: inline-block;
      font-size: 1rem;
      font-weight: bold;
      margin: 0.3rem 0 1rem 0;
    }
  }
  @media only screen and (max-width: ${SM_SIZE}) {
    .footer_list {
      li {
        span {
          font-size: 1.3rem;
        }
      }
    }
  }
`;

const OnInfoModal = (onInfo: boolean) => css`
  transform: ${onInfo ? "translateX(0)" : "translateX(100%)"};
  top: ${checkListStore.isSubmit
    ? checkListStore.isPermanetSubmit
      ? "3.438rem"
      : "calc(50% + 3.438rem)"
    : "3.438rem"};
`;

const Footer = observer(() => {
  const history = useHistory();
  const confirm = () => {
    checkListStore.goBack();
    history.push("/");
  };
  return (
    <FooterComponent css={OnInfoModal(mainStore?.onInfoModal)}>
      <ul className="footer_list">
        <li>
          <a href="https://github.com/noah071610" target="_blank" rel="noreferrer">
            <GithubFilled />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/salmonchobab/" target="_blank" rel="noreferrer">
            <InstagramFilled />
          </a>
        </li>
        <li>
          <a href="mailto:noah071610@naver.com">
            <MailFilled />
          </a>
        </li>
      </ul>
      <Popconfirm
        title="Are you sure to go back first page? We delete your all infomations."
        onConfirm={confirm}
        placement="bottomRight"
        okText="Yes"
        cancelText="No"
      >
        <a className="footer_gobackBtn btn-underLine">Go back first page</a>
      </Popconfirm>
      <h4>ⓒ 2021, Jang Hyun Soo, All Rights Resrved</h4>
      <h4>Supported by Korea Tourism Organization's open API</h4>
      <h4>관광통역안내사 영어 / 일본어 , 국외여행인솔자 자격증 소유 개발자</h4>
      <h4>Developer who have ENG & JPN Tourist guide and Tour conduct certification</h4>
      <h4>英語＆日本語全国通訳士と国外引率者資格持ち開発者</h4>
    </FooterComponent>
  );
});

export default Footer;
