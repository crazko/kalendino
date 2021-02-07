import { Icon, LatLngTuple } from 'leaflet';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

type MapProps = {
  children?: never;
  center: LatLngTuple;
  zoom?: number;
  onClick?: (values: LatLngTuple) => void;
};

type LocationMarker = {
  position?: LatLngTuple;
  onClick?: (location: LatLngTuple) => void;
};

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
      if (onClick !== undefined) {
        setPosition([e.latlng.lat, e.latlng.lng]);
        onClick([e.latlng.lat, e.latlng.lng]);
      }
    },
  });

  return position ? <Marker position={position} icon={icon} /> : null;
};

export const Map: React.FC<MapProps> = ({ onClick, center, zoom = 13 }) => (
  <MapContainer center={center} zoom={zoom} className="w-100 h-96">
    <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
    <LocationMarker position={center} onClick={onClick} />
  </MapContainer>
);
