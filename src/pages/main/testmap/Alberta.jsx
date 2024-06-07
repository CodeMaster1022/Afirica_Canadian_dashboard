import { MapContainer, GeoJSON, TileLayer, ScaleControl } from 'react-leaflet';
import { useState, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import Alberta from './alberta.json';
import { getColor, layersUtils, getCenterOfGeoJson } from './mapUtils';

const COUNTRY_VIEW_ID = 'alberta';
const AlbertaMap = () => {
  const mapStyle = { height: '100vh', width: '100vw' };
  const [geoJsonId, setGeoJsonId] = useState('alberta');
  const geoJson = Alberta.Objects[geoJsonId];
  var mapRef = useRef(null);
  var geoJsonRef = useRef(null);
  const mapCenter = getCenterOfGeoJson(geoJson);
  const onDrillDown = (e) => {
    console.log('jelllldfs', geoJsonId);
    console.log(e.target.feature.id);
    const featureId = e.target.feature.id;
    if (!Alberta.Objects[featureId]) return;
    setGeoJsonId(featureId);
  };
  return (
    <>
      <button onClick={() => setGeoJsonId(COUNTRY_VIEW_ID)} className="backButton">
        Back To City View
      </button>
      <MapContainer ref={mapRef} center={mapCenter} zoom={10} style={mapStyle}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON data={geoJson} key={geoJsonId} style={geoJSONStyle} onEachFeature={onEachFeature} ref={geoJsonRef} id="geoJsonAll" />
        <ScaleControl />
      </MapContainer>
    </>
  );

  function onEachFeature(_, layer) {
    let layerUtils = layersUtils(geoJsonRef, mapRef);
    layer.on({
      mouseover: layerUtils.highlightOnClick,
      click: onDrillDown
    });
  }

  function geoJSONStyle(feature) {
    return {
      color: '#1f2021',
      weight: 1,
      fillOpacity: 0.5,
      fillColor: getColor(Math.floor(Math.random() * 26))
    };
  }
};
export default AlbertaMap;
