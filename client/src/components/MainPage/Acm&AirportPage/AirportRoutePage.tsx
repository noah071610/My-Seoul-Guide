/* eslint-disable jsx-a11y/anchor-is-valid */
import Slider from "react-slick";
import { observer } from "mobx-react";
import { SwapLeftOutlined, SwapRightOutlined } from "@ant-design/icons";
import { useCallback } from "react";
import { placeList } from "../../../config";
import { Select } from "antd";
import { mainStore } from "../../../@store/store";
import AirportCard from "../_Common/AirportCard";
import PlaceCard from "../_Common/PlaceCard";
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
          {placeList.map((place, i) => (
            <PlaceCard key={i} place={place} index={i} />
          ))}
        </Slider>
      ) : (
        <AirportCard />
      )}
    </>
  );
});

export default AirportRoutePage;
