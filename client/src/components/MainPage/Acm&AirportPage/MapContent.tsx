import { observer } from "mobx-react";
import { FC, useCallback, useEffect, useState } from "react";
import MainPageWrapper from "../MainPageWrapper";
import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";
import { mainStore } from "../../../@store/store";
import ContentCard from "../_Common/ArticleBox";
import { useRouteMatch } from "react-router";
import { polygonOption } from "../../../config";
import { useCalcCenter } from "../../../hooks/useCalcCenter";
import { Directions } from "../_Common/Directions";

const MapContent: FC = observer(() => {
  const { path } = useRouteMatch();
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  let isRoutePath = path.slice(1) === "airport_route";

  const mapContainerStyle = {
    height: isRoutePath ? "80%" : "50%",
    width: "100%",
  };
  const onClickDirection = useCallback((listNum: number) => {
    mainStore.addAcmCard(listNum);
  }, []);

  useEffect(() => {
    if (mainStore.acmCard) {
      let centerXY = useCalcCenter(mainStore.acmCard.path);
      setCenter(centerXY);
    } else if (mainStore.airportInfo) {
      setCenter({ lat: 37.517146640932296, lng: 126.80792769408053 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainStore.acmCard, mainStore.airportInfo]);

  return (
    <MainPageWrapper>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_MAP_CLIENT_ID as string}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={isRoutePath ? 10 : 14}
        >
          {isRoutePath ? (
            <Directions
              origin={mainStore.airportInfo?.path}
              destination={mainStore.acmCard?.stationPath}
            />
          ) : (
            <Polygon paths={mainStore.acmCard?.path} options={polygonOption} />
          )}
        </GoogleMap>
      </LoadScript>
      {isRoutePath ? (
        <div className="main_route">
          <div onClick={() => onClickDirection(0)}>
            <h3>
              From InCheon Airport ✈ to <span>Myeong-dong</span>
            </h3>
          </div>
          <div onClick={() => onClickDirection(1)}>
            <h3>
              From InCheon Airport ✈ to <span>Hong-dae</span>
            </h3>
          </div>
        </div>
      ) : (
        <ContentCard />
      )}
    </MainPageWrapper>
  );
});

export default MapContent;
