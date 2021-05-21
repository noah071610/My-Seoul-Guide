import Slider from "react-slick";
import { observer } from "mobx-react";
import { SwapLeftOutlined, SwapRightOutlined } from "@ant-design/icons";
import { useCallback } from "react";
import { BLUE_COLOR, placeList, SM_SIZE, WHITE_COLOR } from "../../../config";
import { Select } from "antd";
import { mainStore } from "../../../@store/store";
import AirportCard from "../_Common/AirportCard";
import PlaceCard from "../_Common/ContentSmallBox";
import styled from "@emotion/styled";
const { Option } = Select;

const RouteContent = styled.div`
  .ant-select-selection-item {
    padding: 0 !important;
  }
  .ant-select-arrow {
    display: none;
  }
  .route {
    &_header {
      padding: 1rem;
      font-size: 0.9rem;
      display: flex;
    }
    &_title {
      display: flex;
      align-items: center;
      &_name {
        margin-right: 1rem;
      }
    }
    &_recm {
      display: flex;
      align-items: center;
      &_desc {
        margin: 0 0.5rem 0 1.5rem;
      }
      &_list {
        display: flex;
        align-items: center;
        li {
          margin: 0 0 0 0.5rem;
          &:hover {
            a {
              color: ${WHITE_COLOR};
            }
          }
        }
      }
    }
    @media only screen and (max-width: ${SM_SIZE}) {
      &_header {
        padding: 1rem;
        flex-direction: column;
      }
      &_title {
        display: block;
        &_name {
          margin-right: 1rem;
        }
      }
      &_recm {
        margin-top: 1.5rem;
        &_desc {
          margin: 0 0.5rem 0 0;
        }
        &_list {
          li {
            margin-right: 0.5rem;
            display: inline-block;
          }
        }
      }
    }
  }
`;

const SliderPrevBtn = styled.button`
  position: absolute;
  z-index: 1;
  top: -3rem;
  font-size: 1.5rem;
  right: 3rem;
  &:hover {
    color: ${BLUE_COLOR};
  }
  @media only screen and (max-width: ${SM_SIZE}) {
    display: none;
  }
`;

const SliderNextBtn = styled.button`
  position: absolute;
  z-index: 1;
  top: -3rem;
  font-size: 1.5rem;
  right: 1rem;
  &:hover {
    color: ${BLUE_COLOR};
  }
  @media only screen and (max-width: ${SM_SIZE}) {
    display: none;
  }
`;

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

const AirportContent = observer(() => {
  const onChangeAirport = useCallback((value) => {
    mainStore.setAirport(value);
  }, []);

  const onClickRecomPlace = useCallback((id: number) => {
    mainStore.changeDestination(id - 1);
  }, []);
  return (
    <>
      <RouteContent>
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
      </RouteContent>
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

export default AirportContent;
