/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC, useCallback, useRef, useState } from "react";
import Slider from "react-slick";
import { page_images } from "../../config";
import CheckListForm from "./CheckListForm";
import { checkListStore } from "../../@store/store";
import { observer } from "mobx-react";

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

const TitleUp = (onForm: boolean) => css`
  ${onForm ? "transform:translateY(-200%)" : "transform:translateY(-20%)"};
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
    <div className="home_landing">
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
    </div>
  );
});

export default LandingPage;
