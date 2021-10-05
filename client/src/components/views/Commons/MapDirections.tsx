import { DirectionsRenderer, DirectionsService } from "@react-google-maps/api";
import React, { useEffect, useRef, useState } from "react";

export const MapDirections = (props: any) => {
  const [directions, setDirections] = useState();
  const { origin, destination } = props;
  const count = useRef(0);

  const options = {
    polylineOptions: {
      strokeColor: "red",
      strokeWeight: 6,
      strokeOpacity: 0.8,
    },
  };

  useEffect(() => {
    count.current = 0;
  }, [destination]);

  const directionsCallback = (res: any, status: any) => {
    if (status === "OK" && count.current === 0) {
      count.current += 1;
      setDirections(res);
    }
  };

  return (
    <>
      <DirectionsService
        options={{ origin, destination, travelMode: "TRANSIT" }}
        callback={directionsCallback}
      />
      <DirectionsRenderer directions={directions} options={options} />
    </>
  );
};
