/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC, useCallback, useRef, useState } from "react";
import Slider from "react-slick";
import { BLUE_COLOR, MD_SIZE, page_images, WHITE_COLOR } from "../../config";
import CheckListForm from "./CheckListForm";
import { checkListStore } from "../../@store/store";
import { observer } from "mobx-react";
import styled from "@emotion/styled";

const Landing = styled.div`
  position: relative;
  .slick-slider {
    height: 100vh;
    overflow: hidden;
    .landing_bg {
      width: 100%;
      height: 100vh;
    }
  }
  .landing_title {
    position: absolute;
    top: 45%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      transition: 0.3s;
      font-family: "Kaushan Script", cursive;
      color: ${WHITE_COLOR};
      text-align: center;
      user-select: none;
      background-image: linear-gradient(transparent calc(100% - 3px), ${WHITE_COLOR} 5px);
      background-repeat: no-repeat;
      background-size: 0% 100%;
    }
    button {
      transition: 0.3s;
      font-size: 2rem;
      font-weight: bold;
      color: ${WHITE_COLOR};
      &:hover {
        color: ${BLUE_COLOR};
      }
    }
  }
  @media only screen and (max-width: ${MD_SIZE}) {
    .landing_title {
      h1 {
        font-size: 2.5rem;
      }
      button {
        font-size: 1.5rem;
      }
    }
  }
`;

const TitleUp = (onForm: boolean) => css`
  ${onForm ? "transform:translateY(-210%)" : "transform:translateY(-20%)"};
  ${onForm && "animation: underLining 0.3s 0.4s forwards"};
`;

const ButtonDown = (onForm: boolean) => css`
  ${onForm ? "transform:translateY(440%)" : "transform:translateY(0)"}
`;

const imageChanger = (imageURL: string) => css`
  background: url(${imageURL}) no-repeat fixed center;
  background-size: cover;
  animation: zoomInOut 20s infinite linear alternate forwards;
`;

const settings = {
  dots: false,
  fade: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 20000,
  slidesToShow: 1,
  touchMove: false,
  pauseOnHover: false,
  pauseOnFocus: false,
};

const LandingPage: FC = observer(() => {
  const formRef = useRef<HTMLDivElement | null>(null);
  const [onForm, setOnForm] = useState(false);
  const onClickOpenForm = useCallback(() => {
    setOnForm(true);
  }, []);
  const onSubmitForm = useCallback(() => {
    if (!checkListStore.gender || !checkListStore.age || !checkListStore.party) {
      formRef?.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    checkListStore.onSubmit();
  }, []);

  return (
    <Landing>
      <Slider {...settings}>
        {page_images.map((v, i) => (
          <div className="landing_bg" key={i} css={imageChanger(v)} />
        ))}
      </Slider>
      <div className="landing_title">
        <h1 css={TitleUp(onForm)}>Hello, My first Seoul</h1>
        {onForm && <CheckListForm formRef={formRef} />}
        <button css={ButtonDown(onForm)} onClick={onForm ? onSubmitForm : onClickOpenForm}>
          {onForm ? "Guide Start" : "Go into Seoul"}
        </button>
      </div>
    </Landing>
  );
});

export default LandingPage;
