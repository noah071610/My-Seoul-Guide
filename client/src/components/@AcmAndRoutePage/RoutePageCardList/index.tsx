import Slider from "react-slick";
import { observer } from "mobx-react";
import { SwapLeftOutlined, SwapRightOutlined } from "@ant-design/icons";
import React, { useCallback } from "react";
import { Select } from "antd";
import { mainStore } from "../../../store/store";
import AirportCard from "../../Common/AirportCard";
import PlaceCard from "../../Common/ContentSmallBox";
import { RouteCardListMenu, SliderNextBtn, SliderPrevBtn } from "./styles";
import { placeList } from "../../../config";
const { Option } = Select;

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <SliderPrevBtn onClick={onClick}>
      <SwapLeftOutlined />
    </SliderPrevBtn>
  );
}

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <SliderNextBtn onClick={onClick}>
      <SwapRightOutlined />
    </SliderNextBtn>
  );
}
const settings = {
  dots: false,
  slidesToShow: 3,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
};

const RoutePageCardList = observer(() => {
  const onChangeAirport = useCallback((value) => {
    mainStore.setAirport(value);
  }, []);

  const onClickRecomPlace = useCallback((id: number) => {
    mainStore.changeDestination(id - 1);
  }, []);
  return (
    <>
      <RouteCardListMenu>
        <div className="route_header">
          {mainStore.airport ? (
            <>
              <div className="route_title">
                <span className="route_title_name">Route from :</span>
                <Select onChange={onChangeAirport} defaultValue={mainStore.airport.name}>
                  <Option value="0">Incheon-Airport</Option>
                  <Option value="1">Gimpo-Airport</Option>
                </Select>
              </div>
              <div className="route_recm">
                <span className="route_recm_desc">Recommendation :</span>
                <ul className="route_recm_list">
                  {mainStore.recommend_places.map((v, i) => (
                    <li key={i}>
                      <a onClick={() => onClickRecomPlace(v.id)} className="tag">
                        {v.title._text}🌟
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            "✈ Select your arrival airport"
          )}
        </div>
      </RouteCardListMenu>
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

export default RoutePageCardList;
