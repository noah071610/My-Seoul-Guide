import { gql, useQuery } from "@apollo/client";
import { Divider } from "antd";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { checkListStore, mainStore } from "../../../@store/store";
import { kpop_recommends } from "../../../config";
import LoadingPage from "../LoadingPage";
import PlaceCard from "./ContentSmallBox";
import useShuffle from "../../../hooks/useShuffle";

const GET_RECOMMEND = gql`
  query {
    FoodRecommendCards {
      title {
        _text
      }
      firstimage {
        _text
      }
      mapx {
        _text
      }
      mapy {
        _text
      }
    }
    ShoppingRecommendCards {
      title {
        _text
      }
      firstimage {
        _text
      }
      mapx {
        _text
      }
      mapy {
        _text
      }
    }
    NearRecommendCards(mapx: number, mapy: number) {
      title {
        _text
      }
      firstimage {
        _text
      }
      mapx {
        _text
      }
      mapy {
        _text
      }
    }
  }
`;

const HomeModal = observer(() => {
  const { loading, error, data } = useQuery(GET_RECOMMEND, {
    variables: { mapx: mainStore.place?.stationPath.lng, mapy: mainStore.place?.stationPath.lat },
  });
  if (loading) return <LoadingPage />;
  if (error) return <p className="error">Error :(</p>;

  return (
    <>
      <div
        style={
          checkListStore.overlayCnt > 2
            ? { display: "block", animation: "border 2s infinite" }
            : { display: "none" }
        }
        className="home_map_modal home_modal"
      >
        <h3>Let`s start to make Your own Seoul Travel Map!</h3>
        <Divider />
        <h4>
          <span>First</span> Check the Accomodation.
        </h4>
        <h4>
          <span>Second</span> Pick the Recommendation and look around the route from Airport to
          Accomodation.
        </h4>
        <h4>
          <span>Third</span> Check Activities and Festivals out, and pick your own's like
          Attractions.
        </h4>
      </div>
      <div
        style={
          checkListStore.overlayCnt === 2
            ? { display: "block", animation: "border 2s infinite" }
            : { display: "none" }
        }
        className="home_menu_modal home_modal"
      >
        <h3>Menu is simply to use</h3>
        <Divider />
        <h4>
          <span>Home</span> Keep and overview your Collection.
        </h4>
        <h4>
          <span>Accommodation</span>View Recommendation Stay area.
        </h4>
        <h4>
          <span>From Airport</span>Check direction from Airport to Acommodation.
        </h4>
        <h4>
          <span>Attractions</span>Check popular play place in Seoul.
        </h4>
        <h4>
          <span>Analyzer</span>You can manage budget and payment for travel here.
        </h4>
      </div>
      <div
        style={checkListStore.overlayCnt === 1 ? { display: "block" } : { display: "none" }}
        className="home_recommend_modal home_modal"
      >
        <h3>Here is our Recommendation place to stay for you 😘</h3>
        <ul>
          {mainStore.userInfo?.purpose.concat(mainStore.userInfo?.acm).map((v, i) => (
            <li className="tag" key={i}>
              {v}
            </li>
          ))}
        </ul>
        <Divider />
        <div className="modal_acm_box">
          <PlaceCard isBest={true} place={mainStore.recommend_places[0]} />
          <PlaceCard place={mainStore.recommend_places[1]} />
        </div>
        <Divider />
        <h3>
          <Link to="/stay">Check Accommodation page and choose one which you like !</Link>
        </h3>
      </div>
      <div className="home_recommend_modal home_modal">
        <h3>Hello, {mainStore.userInfo?.gender}! I found attraction you may like</h3>
        <ul>
          <li className="tag">Food</li>
        </ul>
        <Divider />
        <div>{data?.TypeRecommendCard?.map((v: any) => v.title._text)}</div>
        <Divider />
      </div>
    </>
  );
});

export default HomeModal;
