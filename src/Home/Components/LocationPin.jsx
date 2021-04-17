import { Icon } from "@iconify/react";
import mapMarker from "@iconify-icons/el/map-marker";

const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={mapMarker} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
);

export default LocationPin;
