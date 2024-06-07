/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import PropTypes, { elementType } from 'prop-types';

const MarkersPopups = ({ search, data }) => {
  useEffect(() => {
    console.log('ok');
    async function initMap() {
      // Request needed libraries.
      // eslint-disable-next-line no-unused-vars
      const { Map, InfoWindow } = await window.google.maps.importLibrary('maps');
      const { AdvancedMarkerElement, PinElement } = await window.google.maps.importLibrary('marker');
      const map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: { lat: 56.1304, lng: -106.3468 },
        mapId: '7ba16be0c9375fa7'
      });
      const featureLayer = map.getFeatureLayer(window.google.maps.FeatureType.POSTAL_CODE);
      featureLayer.style = (featureStyleFunctionOptions) => {
        const placeFeature = featureStyleFunctionOptions.feature;
        const population = states[placeFeature.placeId];
        let fillColor;
        if (population < 2) {
          fillColor = '#E4FBFD';
        } else if (population < 3) {
          fillColor = '#91E9F2';
        } else if (population < 4) {
          fillColor = '#00C4E1';
        } else if (population < 7) {
          fillColor = '#014167';
        }
        return {
          fillColor,
          fillOpacity: 0.8
        };
      };
      const infoWindow = new window.google.maps.InfoWindow({
        content: '',
        disableAutoPan: true
      });
      // Create an array of alphabetical characters used to label the markers.
      const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      // Add some markers to the map.

      const markers = data
        .filter((city) => city.province === search)
        .map((city, i) => {
          const position = { lat: city.latlng[0], lng: city.latlng[1] };
          const label = labels[i % labels.length];
          const pinGlyph = new window.google.maps.marker.PinElement({
            glyph: label,
            glyphColor: 'white'
          });
          const marker = new window.google.maps.marker.AdvancedMarkerElement({
            position,
            content: pinGlyph.element
          });

          // markers can only be keyboard focusable when they have click listeners
          // open info window when marker is clicked
          marker.addListener('click', (e) => {
            const innerHTML = `
            <div>
              <img
                src=${city.image}
                style=" width: 230px;height: 300px, backgroundSize: 'cover', backgroundPosition: 'center'"
                alt="hello"
              />
              <h3>${city.name}</h3>
              <h3>${city.nickName}</h3>
              <h3>${city.joined}</h3>
              <h3>${city.country}</h3>
              <h3>${city.joined}</h3>
              <button style="background-color:MediumSeaGreen;color: white;padding: 15px 32px;border: none; width:100%";border-radius: 12px;">View Detail</button>
            </div>`;
            infoWindow.setContent(innerHTML);
            console.log('info::', e.domEvent.clientX, e.domEvent.clientY);
            infoWindow.open(map, marker);
          });
          return marker;
        });
      // is placeID which allow to find location.
      const states = {
        ChIJtRkkqIKyCVMRno6bQJpHqbA: 6,
        'ChIJL3ZlI7Fx-FIRK-HCklcrNBU': 3,
        ChIJE7XnRW_gbVIRaMfBq_JVDxw: 2,
        'ChIJr2prqsdmelMR-fHnN-lBG4g': 4,
        //Yukon,
        ChIJiYtStJiBF1ER6pbMYdWcFC4: 5,
        //NothWest
        ChIJDcHTs_Q4EVERjVnGRNguMhk: 1,
        ChIJ7aUkKkkjCE0RtqnxTwVx0_8: 1,
        'ChIJrxNRX7IFzkwRCR5iKVZC-HA': 4,
        ChIJoajRnzS1WEwRIABNrq0MBAE: 5
      };

      // Add a marker clusterer to manage the markers.
      new MarkerClusterer({ markers, map });
    }
    initMap();
  });
  return <div id="map" style={{ width: '100%', height: '80vh' }}></div>;
};

export default MarkersPopups;
MarkersPopups.propTypes = { data: PropTypes.array, search: PropTypes.string, other: PropTypes.any };
// import PropTypes from 'prop-types';
// import { useState, memo } from 'react';
// // material-ui
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';
// import { Button } from '@mui/material';
// // third-party
// import { Map } from 'react-map-gl';

// // project-import
// import MapControl from 'components/third-party/map/MapControl';
// import MapMarker from 'components/third-party/map/MapMarker';
// import MapPopup from 'components/third-party/map/MapPopup';
// import { CalendarOutlined, ContactsOutlined, CheckOutlined, ExportOutlined, EnvironmentOutlined } from '@ant-design/icons';

// // ==============================|| MAPBOX - MARKERS AND POPUP ||============================== //

// function MarkersPopups({ search, data, ...other }) {
//   const [popupInfo, setPopupInfo] = useState(null);
//   return (
//     <Map
//       initialViewState={{
//         latitude: 56.1304,
//         longitude: -106.3468,
//         zoom: 3.5
//       }}
//       {...other}
//     >
//       <MapControl />
//       {data
//         .filter((city) => city.province === search)
//         .map(
//           (city, index) => (
//             // search === city.province && (
//             <MapMarker
//               key={`marker-${index}`}
//               latitude={city.latlng[0]}
//               longitude={city.latlng[1]}
//               onClick={(event) => {
//                 event.originalEvent.stopPropagation();
//                 setPopupInfo(city);
//               }}
//             />
//           )
//           // )
//         )}

//       {popupInfo && (
//         <MapPopup latitude={popupInfo.latlng[0]} longitude={popupInfo.latlng[1]} onClose={() => setPopupInfo(null)}>
//           <Box
//             sx={{
//               mb: 1,
//               width: '500px',
//               display: 'flex',
//               alignItems: 'left'
//             }}
//           ></Box>
//           <Box>
//             <img
//               src={popupInfo.image}
//               style={{ width: '100%', height: '200px', backgroundSize: 'cover', backgroundPosition: 'center' }}
//               alt="hello"
//             />
//           </Box>
//           <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
//             <Typography variant="h3">{popupInfo.name}</Typography>
//             <Box sx={{ backgroundColor: 'blue', borderRadius: '50px', paddingX: '5px', marginLeft: '20px' }}>
//               <CheckOutlined style={{ color: 'white' }} />
//             </Box>
//           </Box>
//           <Stack direction="row" alignItems="center" spacing={1} paddingTop={0.5}>
//             <Typography variant="h4" color={'grey'}>
//               {popupInfo.nickName}
//             </Typography>
//           </Stack>
//           <Stack direction="row" alignItems="center" spacing={1} paddingTop={0.5}>
//             <CalendarOutlined />
//             <Typography variant="h5" sx={{ marginTop: '5px' }}>
//               {popupInfo.joined}
//             </Typography>
//           </Stack>

//           <Stack direction="row" alignItems="center" spacing={1} paddingTop={0.5}>
//             <ContactsOutlined />
//             <Typography variant="h5">{popupInfo.country}</Typography>
//           </Stack>

//           <Stack direction="row" alignItems="center" spacing={1} paddingTop={0.5}>
//             <EnvironmentOutlined />
//             <Typography variant="h5">{popupInfo.code}</Typography>
//           </Stack>

//           <Stack direction="row" alignItems="center" spacing={1} paddingTop={0.5}>
//             <Button variant="outlined" fullWidth color="info">
//               View Detail
//               <ExportOutlined style={{ marginLeft: '30px' }} />
//             </Button>
//           </Stack>
//         </MapPopup>
//       )}
//     </Map>
//   );
// }

// export default memo(MarkersPopups);

// MarkersPopups.propTypes = { data: PropTypes.array, search: PropTypes.string, other: PropTypes.any };
