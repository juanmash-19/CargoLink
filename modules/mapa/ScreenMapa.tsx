import React from 'react';

import {GoogleMap,
        LoadScript
} from '@react-google-maps/api';


const containerStyle = {
    width : "1050px",
    height :"650"
}

const center = {
    lat: -34.397,
    lng: 150.644
}

function ScreenMapa() {
  return (
    <div>
        <LoadScript googleMapsApiKey=''>
            <GoogleMap mapContainerStyle={containerStyle}/>
        </LoadScript>
      
    </div>
  )
}

export default ScreenMapa

