'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export interface Worker {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: string;
  zone: string;
  platform: string;
}

interface Props {
  workers: Worker[];
}

// Fix marker icons
function fixLeafletIcons() {
  // @ts-ignore
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl:
      'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl:
      'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
}

const activeIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const idleIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function LiveTrackingMap({ workers }: Props) {
  useEffect(() => {
    fixLeafletIcons();
  }, []);

  return (
    <MapContainer
      center={[19.076, 72.8777]}
      zoom={11}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {workers.map((worker) => (
        <Marker
          key={worker.id}
          position={[worker.lat, worker.lng]}
          icon={worker.status === 'active' ? activeIcon : idleIcon}
        >
          <Popup>
            <div>
              <b>{worker.name}</b>
              <br />
              {worker.zone}
              <br />
              {worker.platform}
              <br />
              {worker.status}
            </div>
          </Popup>

          {worker.status === 'active' && (
            <Circle
              center={[worker.lat, worker.lng]}
              radius={200}
              pathOptions={{ color: 'green' }}
            />
          )}
        </Marker>
      ))}
    </MapContainer>
  );
}