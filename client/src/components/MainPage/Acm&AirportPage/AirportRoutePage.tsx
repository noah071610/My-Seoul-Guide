/* eslint-disable jsx-a11y/anchor-is-valid */
import Slider from "react-slick";
import { observer } from "mobx-react";
import { SwapLeftOutlined, SwapRightOutlined } from "@ant-design/icons";
import ContentSmallBox from "../_Common/ContentSmallBox";
import { mainStore } from "../../../@store/store";
import { useCallback } from "react";
import { airportList } from "../../../config";
import { Select } from "antd";
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

interface Props {
  isPickAirport: number;
  setIsPickAirport: (number: number) => void;
}

const AirportRoutePage = observer(({ isPickAirport, setIsPickAirport }: Props) => {
  const onClickAirport = useCallback(
    (number: number) => {
      setIsPickAirport(number);
    },
    [setIsPickAirport]
  );

  return (
    <>
      <div className="route_content_header">
        <h3 className="route_content_info">
          {isPickAirport ? (
            <>
              Route from :
              <Select
                style={{ margin: "0 1rem" }}
                defaultValue={airportList[isPickAirport - 1].name}
              >
                <Option value="Incheon-Airport">Incheon-Airport</Option>
                <Option value="Gimpo-Airport">Gimpo-Airport</Option>
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
      {isPickAirport ? (
        <Slider {...settings}>
          <div className="content_small_box">
            <h2>
              <span>{mainStore.acmCard?.title._text}</span>
              <a>View Route 📍</a>
            </h2>
            <div className="image_wrapper">
              <img alt="tour_acm_redcommendation_img" src={mainStore.acmCard?.firstimage._text} />
            </div>
          </div>
          <div className="content_small_box">
            <h2>
              <span>{mainStore.acmCard?.title._text}</span>
              <a>View Route 📍</a>
            </h2>
            <div className="image_wrapper">
              <img alt="tour_acm_redcommendation_img" src={mainStore.acmCard?.firstimage._text} />
            </div>
          </div>
          <div className="content_small_box">
            <h2>
              <span>{mainStore.acmCard?.title._text}</span>
              <a>View Route 📍</a>
            </h2>
            <div className="image_wrapper">
              <img alt="tour_acm_redcommendation_img" src={mainStore.acmCard?.firstimage._text} />
            </div>
          </div>
          <div className="content_small_box">
            <h2>
              <span>{mainStore.acmCard?.title._text}</span>
              <a>View Route 📍</a>
            </h2>
            <div className="image_wrapper">
              <img alt="tour_acm_redcommendation_img" src={mainStore.acmCard?.firstimage._text} />
            </div>
          </div>
        </Slider>
      ) : (
        <ContentSmallBox onClickAirport={onClickAirport} />
      )}
    </>
  );
});

export default AirportRoutePage;
