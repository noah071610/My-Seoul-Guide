import { observer } from "mobx-react";
import { FC, useEffect, useState } from "react";
import MainPageWrapper from "../MainPageWrapper";
import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";
import AcmPage from "../_Common/ContentBox";
import { useRouteMatch } from "react-router";
import { polygonOption } from "../../../config";
import { useCalcCenter } from "../../../hooks/useCalcCenter";
import { Directions } from "../_Common/Directions";
import AirportPage from "./AirportRoutePage";
import { PathObj } from "../../../types";
import { mainStore } from "../../../@store/store";

const mapContainerStyle = {
  height: "50%",
  width: "100%",
};

const MainPage: FC = observer(() => {
  const { path } = useRouteMatch();
  const [center, setCenter] = useState<PathObj>({
    lat: 37.517146640932296,
    lng: 126.80792769408053,
  });

  let isAirportRoutePath = path.slice(1) === "airport_route";

  useEffect(() => {
    if (!isAirportRoutePath) {
      let centerXY = useCalcCenter(mainStore.place?.path as PathObj[]);
      //doubleCheck
      setCenter(
        centerXY === undefined || null
          ? { lat: 37.517146640932296, lng: 126.80792769408053 }
          : centerXY
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainStore.place]);

  return (
    <MainPageWrapper>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_CLIENT_ID as string}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={isAirportRoutePath ? 10 : 13}
        >
          {isAirportRoutePath ? (
            //You can see direction when you pick airport up
            mainStore.airport && (
              <Directions
                origin={{
                  lat: mainStore.airport?.path.lat,
                  lng: mainStore.airport?.path.lng,
                }}
                destination={{
                  lat: mainStore.place?.stationPath.lat,
                  lng: mainStore.place?.stationPath.lng,
                }}
              />
            )
          ) : (
            //Polygon map area for acm page
            <Polygon paths={mainStore.place?.path} options={polygonOption} />
          )}
        </GoogleMap>
      </LoadScript>
      {isAirportRoutePath ? <AirportPage /> : <AcmPage card={mainStore.place!} isAcmCard={true} />}
    </MainPageWrapper>
  );
});

export default MainPage;
