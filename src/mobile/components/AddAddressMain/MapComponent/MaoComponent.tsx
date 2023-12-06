import { useState, useEffect } from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import LoadingAnimation from "../../../../pages/AnimationLoader/LoadingAnimation";

function MapContainer(props: any) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCB9obt5nOzHPzPirUM9oSRoTEjcFNcw2c",
  });

  const [clickedLatLng, setClickedLatLng] = useState({
    lat: 34.1476216,
    lng: -94.7672497,
  });
  const [center, setCenter] = useState({ lat: 34.1476216, lng: -94.7672497 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position: any) => {
      setCenter({
        lat: position?.coords.latitude,
        lng: position?.coords.longitude,
      });
      setClickedLatLng({
        lat: position?.coords.latitude,
        lng: position?.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    props.mapData(clickedLatLng);
  }, [clickedLatLng]);

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={{
          height: props.height,
          width: "100%",
        }}
        zoom={18}
        onClick={(e: any) => {
          setClickedLatLng(e.latLng.toJSON());
        }}
        center={center}
      >
        <MarkerF position={clickedLatLng} />
      </GoogleMap>
      {/* {<p>{`Current Latitude: ${center.lat}, Current Longitude: ${center.lng}`}</p>} */}
      {center.lat === 34.1476216 &&
      center.lng === -94.7672497 &&
      clickedLatLng.lat == 34.1476216 &&
      clickedLatLng.lng == -94.7672497 ? (
        <h4>
          We were unable to get your exact location. Please drag the pin on this
          map to locate your exact location
        </h4>
      ) : (
        ""
      )}
    </>
  ) : (
    <LoadingAnimation />
  );
}
export default MapContainer;
