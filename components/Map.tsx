import { Icon, LatLngTuple } from 'leaflet';
import { useState } from 'react';
import { MapContainer, TileLayer, Popup, Marker, useMapEvents } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

type MapProps = {
  center: LatLngTuple;
  zoom?: number;
  onClick?: (values: LatLngTuple) => void;
  className?: string;
};

type LocationMarker = {
  position?: LatLngTuple;
  onClick?: (location: LatLngTuple) => void;
};

const style = { width: '100%', height: '500px' };

const icon = new Icon({
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const LocationMarker: React.FC<LocationMarker> = ({ position: initialPosition, onClick }) => {
  const [position, setPosition] = useState<LocationMarker['position']>(initialPosition);

  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);

      if (typeof onClick !== 'undefined') {
        onClick([e.latlng.lat, e.latlng.lng]);
      }
    },
  });

  return position ? <Marker position={position} icon={icon} /> : null;
};

export const Map: React.FC<MapProps> = ({ onClick, center, className, zoom = 13 }) => {
  return (
    <MapContainer center={center} zoom={zoom} className={className} style={style}>
      <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
      <LocationMarker position={center} onClick={onClick} />
    </MapContainer>
  );
};
