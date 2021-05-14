/* eslint-disable jsx-a11y/anchor-is-valid */
import Slider from "react-slick";
import { observer } from "mobx-react";
import { SwapLeftOutlined, SwapRightOutlined } from "@ant-design/icons";
import ContentSmallBox from "../_Common/ContentSmallBox";
import { useCallback } from "react";
import { acmCardList } from "../../../config";
import { Select } from "antd";
import { mainStore } from "../../../@store/store";
const { Option } = Select;

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button className="route_btn_prev route_btn" onClick={onClick}>
      <SwapLeftOutlined />
    </button>
  );
}

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button className="route_btn_next route_btn" onClick={onClick}>
      <SwapRightOutlined />
    </button>
  );
}
const settings = {
  dots: false,
  slidesToShow: 3,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
};

const AirportRoutePage = observer(() => {
  const onClickAcmCard = useCallback((listNum: number) => {
    mainStore.addAcmCard(listNum);
  }, []);

  const onChangeAirport = useCallback((value) => {
    mainStore.setAirport(value);
  }, []);
  return (
    <>
      <div className="route_content_header">
        <h3 className="route_content_info">
          {mainStore.airport ? (
            <>
              Route from :
              <Select
                style={{ margin: "0 1rem" }}
                onChange={onChangeAirport}
                defaultValue={mainStore.airport.name}
              >
                <Option value="0">Incheon-Airport</Option>
                <Option value="1">Gimpo-Airport</Option>
              </Select>
              Recommendation :
              <ul>
                <li>
                  <a className="tag">Myeong-Dong</a>
                </li>
                <li>
                  <a className="tag">Hong-Dae</a>
                </li>
              </ul>
            </>
          ) : (
            "✈ Select your arrival airport"
          )}
        </h3>
      </div>
      {mainStore.airport ? (
        <Slider {...settings}>
          {acmCardList.map((v, i) => (
            <div key={i} onClick={() => onClickAcmCard(i)} className="content_small_box">
              <h2>
                <span>{v.title._text}</span>
                <a>View Route 📍</a>
              </h2>
              <div className="image_wrapper">
                <img alt="tour_acm_redcommendation_img" src={v.firstimage._text} />
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <ContentSmallBox />
      )}
    </>
  );
});

export default AirportRoutePage;
