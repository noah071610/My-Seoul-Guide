import { observer } from "mobx-react";
import { FC } from "react";
import GoogleMapReact from "google-map-react";
import Slider from "react-slick";
import MainPageWrapper from "./MainPageWrapper";

const settings = {
  dots: true,
  slidesToShow: 2,
};

const Marker = ({ text }: { lat: number; lng: number; text: string }) => <div>{text}</div>;

const MainContent: FC = observer(() => {
  return (
    <MainPageWrapper>
      <div className="main_content_wrapper">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyB3aU6T0xfSaAzU6SqUZOlO0didFGsRtJo" }}
          defaultZoom={15}
          defaultCenter={{ lat: 37.55504418865722, lng: 127.93403516189143 }}
        >
          <Marker lat={37.55504418865722} lng={126.93403516189143} text="zzzzz" />
        </GoogleMapReact>
        <div className="content_card_box"></div>
      </div>
    </MainPageWrapper>
  );
});

export default MainContent;
