import { MapContainer, GeoJSON, TileLayer, ScaleControl } from 'react-leaflet';
import { useState, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import { getColor, layersUtils, getCenterOfGeoJson } from '../mapUtils';

const AlbertaMap = ({ regionName = {}, regionFlag = '' }) => {
  console.log(regionName, regionFlag);
  // const COUNTRY_VIEW_ID = regionFlag;
  // console.log(COUNTRY_VIEW_ID);

  const mapStyle = { height: '100vh', width: '100vw' };
  const [geoJsonId, setGeoJsonId] = useState(regionFlag);
  const geoJson = regionName.Objects[geoJsonId];
  var mapRef = useRef(null);
  var geoJsonRef = useRef(null);
  let mapCenter = {};
  try {
    mapCenter = getCenterOfGeoJson(geoJson);
  } catch (e) {
    return <></>;
  }
  const onDrillDown = (e) => {
    const featureId = e.target.feature.id;
    if (!regionName.Objects[featureId]) return;
    setGeoJsonId(featureId);
  };

  return (
    <>
      {/* <button onClick={() => setGeoJsonId(COUNTRY_VIEW_ID)} className="backButton">
        Back To City View
      </button> */}
      {Object.keys(regionName).length > 0 && regionFlag !== '' && (
        <MapContainer ref={mapRef} center={mapCenter} zoom={5} style={mapStyle}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <GeoJSON data={geoJson} key={geoJsonId} style={geoJSONStyle} onEachFeature={onEachFeature} ref={geoJsonRef} id="geoJsonAll" />
          <ScaleControl />
        </MapContainer>
      )}
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
AlbertaMap.propTypes = { regionName: PropTypes.object.isRequired, regionFlag: PropTypes.string.isRequired };
