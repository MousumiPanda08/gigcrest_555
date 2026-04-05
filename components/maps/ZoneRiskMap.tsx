// components/maps/ZoneRiskMap.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { Zone, DisruptionEvent, WeatherData } from '@/types';
import 'leaflet/dist/leaflet.css';

interface ZoneMarkerProps {
  zone: Zone;
  activeEvent?: DisruptionEvent;
  weather?: WeatherData;
}

const ZoneMarker: React.FC<ZoneMarkerProps> = ({ zone, activeEvent, weather }) => {
  const getColor = () => {
    if (!activeEvent) {
      if (zone.riskLevel === 'very_high') return '#ef4444';
      if (zone.riskLevel === 'high') return '#f97316';
      if (zone.riskLevel === 'medium') return '#eab308';
      return '#22c55e';
    }
    
    // Active event coloring
    if (activeEvent.severityTier === 'T4') return '#dc2626';
    if (activeEvent.severityTier === 'T3') return '#f97316';
    if (activeEvent.severityTier === 'T2') return '#eab308';
    return '#84cc16';
  };

  const color = getColor();
  const radius = zone.radius / 100; // Scale down for map

  return (
    <CircleMarker
      center={[zone.latitude, zone.longitude]}
      radius={Math.max(radius, 8)}
      pathOptions={{
        color: color,
        fillColor: color,
        fillOpacity: activeEvent ? 0.6 : 0.4,
        weight: 2
      }}
      className={activeEvent ? 'animate-pulse' : ''}
    >
      <Popup>
        <div className="min-w-[200px]">
          <h3 className="font-bold text-base mb-2">{zone.name}</h3>
          <p className="text-sm text-gray-600 mb-3">{zone.city}</p>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Risk Level:</span>
              <span className="font-semibold capitalize" style={{ color }}>
                {zone.riskLevel.replace('_', ' ')}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Multiplier:</span>
              <span className="font-semibold">{zone.riskMultiplier}x</span>
            </div>
          </div>

          {weather && (
            <div className="mt-3 pt-3 border-t">
              <p className="text-xs font-semibold text-gray-700 mb-2">Current Conditions:</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>🌡️ {weather.temperature}°C</div>
                <div>🌧️ {weather.rainfall}mm</div>
                <div>💨 AQI {weather.aqi}</div>
                <div>🍃 {weather.windSpeed}km/h</div>
              </div>
            </div>
          )}

          {activeEvent && (
            <div className="mt-3 pt-3 border-t bg-red-50 -mx-3 -mb-3 p-3 rounded-b">
              <p className="text-xs font-bold text-red-800 mb-2">
                ⚠️ ACTIVE EVENT: {activeEvent.eventType.replace('_', ' ').toUpperCase()}
              </p>
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">Severity:</span>
                  <span className="font-bold text-red-600">{activeEvent.severityTier}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Claims:</span>
                  <span className="font-bold">{activeEvent.claimsGenerated}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payouts:</span>
                  <span className="font-bold text-green-600">
                    ₹{activeEvent.totalPayoutAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </Popup>
    </CircleMarker>
  );
};

interface MapControlsProps {
  onCityChange: (city: string, lat: number, lng: number, zoom: number) => void;
}

const MapControls: React.FC<MapControlsProps> = ({ onCityChange }) => {
  const cities = [
    { name: 'Mumbai', lat: 19.0760, lng: 72.8777, zoom: 12 },
    { name: 'Delhi', lat: 28.6139, lng: 77.2090, zoom: 12 },
    { name: 'Bangalore', lat: 12.9716, lng: 77.5946, zoom: 12 }
  ];

  return (
    <div className="absolute top-4 right-4 z-[1000] flex gap-2">
      {cities.map(city => (
        <Button
          key={city.name}
          onClick={() => onCityChange(city.name, city.lat, city.lng, city.zoom)}
          size="sm"
          variant="secondary"
          className="bg-white shadow-lg hover:bg-gray-100"
        >
          {city.name}
        </Button>
      ))}
    </div>
  );
};

const MapUpdater: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  
  return null;
};

interface ZoneRiskMapProps {
  zones: Zone[];
  events?: DisruptionEvent[];
  weather?: WeatherData[];
}

export const ZoneRiskMap: React.FC<ZoneRiskMapProps> = ({ 
  zones, 
  events = [], 
  weather = [] 
}) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([20.5937, 78.9629]);
  const [mapZoom, setMapZoom] = useState(5);

  const handleCityChange = (city: string, lat: number, lng: number, zoom: number) => {
    setMapCenter([lat, lng]);
    setMapZoom(zoom);
  };

  return (
    <div className="relative h-[600px] w-full rounded-lg overflow-hidden border-2 border-gray-200">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater center={mapCenter} zoom={mapZoom} />

        {zones.map(zone => {
          const activeEvent = events.find(e => e.zoneId === zone.id && !e.eventEnd);
          const zoneWeather = weather.find(w => w.zoneId === zone.id);
          
          return (
            <ZoneMarker
              key={zone.id}
              zone={zone}
              activeEvent={activeEvent}
              weather={zoneWeather}
            />
          );
        })}
      </MapContainer>

      <MapControls onCityChange={handleCityChange} />

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="text-xs font-bold text-gray-700 mb-2">Risk Levels</p>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span>Low Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
            <span>Medium Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-orange-500"></div>
            <span>High Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
            <span>Severe/Active Event</span>
          </div>
        </div>
      </div>
    </div>
  );
};