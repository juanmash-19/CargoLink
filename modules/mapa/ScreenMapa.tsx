'use client'

import React from 'react';

import {GoogleMap,
        LoadScript
} from '@react-google-maps/api';


const containerStyle = {
    width : "100%",
    height :"100%"
}

const center = {
    lat: -34.397,
    lng: 150.644
}

function ScreenMapa() {
  return (
    <div>
        <LoadScript googleMapsApiKey='AIzaSyDq8s5fVZ3cLQuPbJQaPoefl5spCCsS-Bc'>
            <GoogleMap mapContainerStyle={containerStyle}/>
        </LoadScript>
      
    </div>
  )
}

export default ScreenMapa

