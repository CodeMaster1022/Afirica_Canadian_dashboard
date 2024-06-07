import React from 'react';
import CanadaMap from 'react-canada-map';

function CommunityMap() {
  const mapClickHandler = (province, event) => {
    console.log('province clicked: ', province);
  };

  const customizeProvince = () => {
    return {
      BC: {
        fillColor: '#BBF2F7',
        onHoverColor: 'black',
        label: 'British Columbia'
      },
      NT: {
        fillColor: '#01C4E0',
        onHoverColor: 'black'
      },
      MB: {
        fillColor: '#BBF2F7',
        onHoverColor: 'black'
      },
      AB: {
        fillColor: '#014167',
        onHoverColor: 'black'
      },
      SK: {
        fillColor: '#E3FBFD',
        onHoverColor: 'black'
      },
      YT: {
        fillColor: '#E3FBFD',
        onHoverColor: 'black'
      },
      NU: {
        fillColor: '#E3FBFD',
        onHoverColor: 'black'
      },
      ON: {
        fillColor: '#E3FBFD',
        onHoverColor: 'black'
      },
      QC: {
        fillColor: '#014167',
        onHoverColor: '#014167'
      },
      NL: {
        fillColor: '#BBF2F7',
        onHoverColor: '#014167'
      },
      NB: {
        fillColor: '#E3FBFD',
        onHoverColor: '#014167'
      },
      NS: {
        fillColor: '#E3FBFD',
        onHoverColor: '#014167'
      },
      PE: {
        fillColor: '#01C4E0',
        onHoverColor: '#014167'
      }
    };
  };
  return (
    <>
      <CanadaMap
        customize={customizeProvince()}
        fillColor="ForestGreen"
        onHoverColor="Gold"
        onClick={mapClickHandler}
        height={'100%'}
        width={'100%'}
      ></CanadaMap>
    </>
  );
}

export default CommunityMap;
