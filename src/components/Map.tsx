import { useEffect, useRef, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

const ACCESS_TOKEN =
  "pk.eyJ1IjoiYm9raWNvZGVzIiwiYSI6ImNrZGE5ZGNidTBnNm0yem1oZmZkdzB3MmsifQ.HbHpfN3sZTlrCFjSSsXmnQ";
mapboxgl.accessToken = ACCESS_TOKEN;

interface MapProps {
  lat: number;
  long: number;
  zoom?: number;
}

export const Map = ({ lat, long, zoom = 14 }: MapProps) => {
  const map = useRef(null);
  const mapContainer = useRef(null);
  useEffect(() => {
    if (map.current) return; //init the map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [long, lat],
      zoom: zoom,
      interactive: false,
    });
  });

  return (
    <div className="flex items-center justify-center relative">
      <div
        ref={mapContainer}
        className="h-[300px] w-full flex items-center justify-center"
      ></div>
      <div className="w-6 h-6 bg-red-600 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );

  //   const [mapState, setMapState] = useState({
  //     latitude: 40.7128,
  //     longitude: -74.006,
  //     zoom: 13,
  //     width: "100%",
  //     height: "200px",
  //   });

  //   return (
  //     <ReactMapGL
  //       {...mapState}
  //       mapboxAccessToken="pk.eyJ1IjoiYm9raWNvZGVzIiwiYSI6ImNrZGE5ZGNidTBnNm0yem1oZmZkdzB3MmsifQ.HbHpfN3sZTlrCFjSSsXmnQ"
  //       mapStyle="mapbox://styles/mapbox/streets-v11"
  //       interactive
  //     >
  //       <Marker latitude={mapState.latitude} longitude={mapState.longitude} />
  //     </ReactMapGL>
  //   );
};
