import { observer } from "mobx-react";
import { FC, useCallback, useEffect, useState } from "react";
import MainPageWrapper from "../MainPageWrapper";
import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";
import AcmPage from "../_Common/ContentBox";
import { useRouteMatch } from "react-router";
import { acmCardList, airportList, polygonOption } from "../../../config";
import { useCalcCenter } from "../../../hooks/useCalcCenter";
import { Directions } from "../_Common/Directions";
import AirportPage from "./AirportRoutePage";
import { PathObj } from "../../../types";
import { mainStore } from "../../../@store/store";

const mapContainerStyle = {
  height: "50%",
  width: "100%",
};

const AccomodationPage: FC = observer(() => {
  const [isPickAirport, setIsPickAirport] = useState<number>(0);
  const { path } = useRouteMatch();
  const [center, setCenter] = useState<PathObj>({
    lat: 37.517146640932296,
    lng: 126.80792769408053,
  });

  let isAirportRoutePath = path.slice(1) === "airport_route";

  const onClickDirection = useCallback((listNum: number) => {
    mainStore.addAcmCard(listNum);
  }, []);

  useEffect(() => {
    mainStore.addAcmCard(0);
  }, []);

  useEffect(() => {
    if (!isAirportRoutePath) {
      let centerXY = useCalcCenter(mainStore.acmCard?.path as PathObj[]);
      //doubleCheck
      setCenter(
        centerXY === undefined || null
          ? { lat: 37.517146640932296, lng: 126.80792769408053 }
          : centerXY
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainStore.acmCard]);

  return (
    <MainPageWrapper>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_CLIENT_ID as string}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={isAirportRoutePath ? 10 : 14}
        >
          {isAirportRoutePath ? (
            //You can see direction when you pick airport up
            isPickAirport && (
              <Directions
                origin={{
                  lat: airportList[isPickAirport - 1]?.path.lat || 37.4480776440891,
                  lng: airportList[isPickAirport - 1]?.path.lng || 126.45117714540771,
                }}
                destination={{
                  lat: mainStore.acmCard?.stationPath.lat || 37.4480776440891,
                  lng: mainStore.acmCard?.stationPath.lng || 126.45117714540771,
                }}
              />
            )
          ) : (
            //Polygon map area for acm page
            <Polygon paths={mainStore.acmCard?.path} options={polygonOption} />
          )}
        </GoogleMap>
      </LoadScript>
      {isAirportRoutePath ? (
        <AirportPage isPickAirport={isPickAirport} setIsPickAirport={setIsPickAirport} />
      ) : (
        <AcmPage card={acmCardList[0]} isAcmCard={true} />
      )}
    </MainPageWrapper>
  );
});

export default AccomodationPage;
