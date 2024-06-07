import center from '@turf/center';
import L from 'leaflet';

export function getColor(d) {
  return d > 25 ? '#014167' : d > 20 ? '#01a5c9' : d > 15 ? '#91eaf2' : d > 10 ? '#e3fbfd' : d > 5 ? '#91eaf2' : '#014167';
}

export function getCenterOfGeoJson(geoJson) {
  return center(geoJson).geometry.coordinates.reverse();
}

export function layersUtils(geoJsonRef, mapRef) {
  function highlightOnClick(e) {
    var layer = e.target;

    layer.setStyle({
      weight: 2,
      color: 'black',
      dashArray: '3',
      fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
  }

  function resetHighlight(e) {
    if (e.target) {
      geoJsonRef.current.leafletElement.resetStyle(e.target);
    }
  }

  function zoomToFeature(e) {
    mapRef.current.leafletElement.fitBounds(e.target.getBounds());
  }

  return { highlightOnClick, resetHighlight, zoomToFeature };
}
