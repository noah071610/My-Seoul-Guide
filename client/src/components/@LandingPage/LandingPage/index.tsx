import { FC, useCallback, useRef, useState } from "react";
import Slider from "react-slick";
import { page_images } from "../../../config";
import CheckListForm from "../CheckListForm";
import { checkListStore } from "../../../store/store";
import { observer } from "mobx-react";
import { ButtonDown, LandingPageWrapper, PosterCSS, TitleUp } from "./styles";

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
    <LandingPageWrapper>
      <Slider {...settings}>
        {page_images.map((v, i) => (
          <div className="landing_bg" key={i} css={PosterCSS(v)} />
        ))}
      </Slider>
      <div className="landing_title">
        <h1 css={TitleUp(onForm)}>Hello, My first Seoul</h1>
        {onForm && <CheckListForm formRef={formRef} />}
        <button css={ButtonDown(onForm)} onClick={onForm ? onSubmitForm : onClickOpenForm}>
          {onForm ? "Guide Start" : "Go into Seoul"}
        </button>
      </div>
    </LandingPageWrapper>
  );
});

export default LandingPage;
