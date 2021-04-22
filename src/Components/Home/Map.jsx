import React from "react";
import GoogleMapReact from "google-map-react";
import { Icon } from "@iconify/react";
import mapMarker from "@iconify-icons/el/map-marker";
import "./map.css";

const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={mapMarker} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
);

const Map = ({ location, zoomLevel }) => (
  <div className="map">
    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCh1v9FM_sv12Ao3PnU9pOUyHQEHC4egj8" }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
      >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        />
      </GoogleMapReact>
    </div>
  </div>
);

export default Map;
