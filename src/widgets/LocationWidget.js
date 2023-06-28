import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function LocationWidget() {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627
    },
    zoom: 11
  };

  const containerStyle = {
    width: '600px',
    height: '400px',
    margin: '20px'
  };

  return (
    <div style={containerStyle}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDQEcx720O4Toxypk-TusScdVapJCVMbH8" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}
