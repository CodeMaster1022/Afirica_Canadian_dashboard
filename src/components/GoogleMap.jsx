import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
};
const center = {
  lat: 7.2905715, // default latitude
  lng: 80.6337262 // default longitude
};

const CustomMap = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyCLFuQW4ZE_EHv4d90HJvj4tGwgEodiEXE',
    libraries
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center}>
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default CustomMap;
