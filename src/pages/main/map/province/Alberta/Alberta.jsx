import { MapContainer, GeoJSON, TileLayer, ScaleControl } from 'react-leaflet';
import { useState, useRef, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import PropTypes from 'prop-types';
import { getColor, layersUtils, getCenterOfGeoJson } from '../mapUtils';
import { useDispatch, useSelector } from 'react-redux';
import { getCountyName } from 'redux/mapRelated/mapSlice';
const AlbertaMap = ({ regionName = {}, regionFlag = '' }) => {
  const dispatch = useDispatch();
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
    const featureId = e.target.feature.properties.GID_2;
    dispatch(getCountyName(featureId));
    if (!regionName.Objects[featureId]) return;
    setGeoJsonId(featureId);
  };
  // const mouseOver = (e) => {
  //   const content = e.target.feature.NAME_2;
  //   if (!regionName.Objects[featureId]) return;
  //   console.log(content);
  // };

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

  // eslint-disable-next-line no-unused-vars
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
