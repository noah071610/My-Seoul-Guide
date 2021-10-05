import { observer } from "mobx-react";
import { FC, useEffect, useState } from "react";
import MainLayout from "@views/Layout";
import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";
import PlaceCards from "@views/Commons/ContentBox";
import { useRouteMatch } from "react-router";
import { useCalcCenter } from "@hooks/useCalcCenter";
import { MapDirections } from "@views/Commons/MapDirections";
import RoutePageCardList from "./RoutePageCardList";
import { mainStore } from "@store/store";
import { PathObj } from "types";
import { polygonOption } from "config";

const AcmAndRoutePage: FC = observer(() => {
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
  }, [isAirportRoutePath, mainStore.place]);

  return (
    <MainLayout>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_CLIENT_ID as string}>
        <GoogleMap
          mapContainerClassName={isAirportRoutePath ? "map_route" : "map_acm"}
          center={center}
          zoom={isAirportRoutePath ? 10 : 13}
        >
          {isAirportRoutePath ? (
            //You can see direction when you pick airport up
            mainStore.airport && (
              <MapDirections
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
        <RoutePageCardList />
      ) : (
        mainStore.place && <PlaceCards card={mainStore.place} isAcmCard={true} />
      )}
    </MainLayout>
  );
});

export default AcmAndRoutePage;
