import { observer } from "mobx-react";
import { FC, useEffect, useState } from "react";
import MainPageWrapper from "../MainPageWrapper";
import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";
import AcmPage from "../_Common/ContentBox";
import { useRouteMatch } from "react-router";
import { polygonOption } from "../../../config";
import { useCalcCenter } from "../../../hooks/useCalcCenter";
import { Directions } from "../_Common/Directions";
import AirportRouteContent from "./AirportRouteContent";
import { PathObj } from "../../../types";
import { mainStore } from "../../../@store/store";

const MainPage: FC = observer(() => {
  const { path } = useRouteMatch();
  let isAirportRoutePath = path.slice(1) === "airport_route";
  const [center, setCenter] = useState<PathObj>({
    lat: 37.517146640932296,
    lng: 126.80792769408053,
  });

  useEffect(() => {
    if (!isAirportRoutePath && mainStore.place) {
      let centerXY = useCalcCenter(mainStore.place?.path as PathObj[]);
      //doubleCheck
      setCenter(centerXY);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAirportRoutePath, mainStore.place]);

  return (
    <MainPageWrapper>
      <LoadScript googleMapsApiKey={"1"}>
        <GoogleMap
          mapContainerClassName={isAirportRoutePath ? "map_route" : "map_acm"}
          center={center}
          zoom={isAirportRoutePath ? 10 : 13}
        >
          {isAirportRoutePath ? (
            //You can see direction when you pick airport up
            mainStore.airport && (
              <Directions
                origin={{
                  lat: mainStore.airport.path.lat,
                  lng: mainStore.airport.path.lng,
                }}
                destination={{
                  lat: mainStore.destination?.stationPath.lat,
                  lng: mainStore.destination?.stationPath.lng,
                }}
              />
            )
          ) : (
            //Polygon map area for acm page
            <Polygon paths={mainStore?.place?.path} options={polygonOption} />
          )}
        </GoogleMap>
      </LoadScript>
      {isAirportRoutePath ? (
        <AirportRouteContent />
      ) : (
        mainStore.place && <AcmPage card={mainStore.place} isAcmCard={true} />
      )}
    </MainPageWrapper>
  );
});

export default MainPage;
