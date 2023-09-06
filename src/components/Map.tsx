import { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

export const Map = () => {
  const [mapState, setMapState] = useState({
    latitude: 40.7128,
    longitude: -74.006,
    zoom: 12,
    width: "100%",
    height: "300px",
  });

  return (
    <ReactMapGL
      {...mapState}
      mapboxAccessToken="pk.eyJ1IjoiYm9raWNvZGVzIiwiYSI6ImNrZGE5ZGNidTBnNm0yem1oZmZkdzB3MmsifQ.HbHpfN3sZTlrCFjSSsXmnQ"
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      <Marker latitude={mapState.latitude} longitude={mapState.longitude} />
    </ReactMapGL>
  );
};
