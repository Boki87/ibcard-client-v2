import { useState } from "react";

export const useGeoLocation = () => {
  const [isSet, setIsSet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; long: number }>({
    lat: 0,
    long: 0,
  });
  const [error, setError] = useState(false);

  function getLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      setError(true);
      return;
    }
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log(position);
        setCoords({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
        setIsLoading(false);
        setIsSet(true);
      },
      (error) => {
        // console.log(error);
        setIsLoading(false);
        setIsSet(false);
      }
    );
  }

  function resetCoords() {
    setIsSet(false);
    setIsLoading(false);
    setCoords({ lat: 0, long: 0 });
  }

  return {
    getLocation,
    error,
    isLoading,
    coords,
    isSet,
    resetCoords,
  };
};
