import { writeData } from '../lib/db.js';
import { Worker, Zone, WeatherData } from '../types/index.js';

const CITIES = ['Mumbai', 'Delhi', 'Bangalore'];
const PLATFORMS: ('swiggy' | 'zomato' | 'both' | 'other')[] = ['swiggy', 'zomato', 'both', 'other'];
const VEHICLES: ('bike' | 'bicycle' | 'e-bike')[] = ['bike', 'bicycle', 'e-bike'];

function generateZones(): Zone[] {
  const zones: Zone[] = [];
  for (let i = 1; i <= 20; i++) {
    const city = CITIES[Math.floor(Math.random() * CITIES.length)];
    zones.push({
      id: `zone_${String(i).padStart(3, '0')}`,
      name: `${city} Zone ${i}`,
      city: city,
      coordinates: {
        lat: 19.076 + (Math.random() - 0.5) * 0.1,
        lng: 72.877 + (Math.random() - 0.5) * 0.1,
      },
      radius: 5 + Math.random() * 5,
      riskLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
      basePremiumFactor: 1.0 + Math.random() * 0.5,
    });
  }
  return zones;
}

function generateWorkers(zones: Zone[]): Worker[] {
  const workers: Worker[] = [];
  for (let i = 1; i <= 100; i++) {
    const zone = zones[Math.floor(Math.random() * zones.length)];
    workers.push({
      id: `worker_${String(i).padStart(4, '0')}`,
      name: `Worker ${i}`,
      phone: `+91${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      city: zone.city,
      primaryZoneId: zone.id,
      deliveryPlatform: PLATFORMS[Math.floor(Math.random() * PLATFORMS.length)],
      vehicleType: VEHICLES[Math.floor(Math.random() * VEHICLES.length)],
      avgDailyEarning: 500 + Math.floor(Math.random() * 1500),
      hoursPerDay: 4 + Math.floor(Math.random() * 8),
      daysPerWeek: 4 + Math.floor(Math.random() * 3),
      experienceMonths: Math.floor(Math.random() * 48),
      upiId: `worker${i}@okaxis`,
      createdAt: new Date().toISOString(),
    });
  }
  return workers;
}

function generateWeather(zones: Zone[]): WeatherData[] {
  const weather: WeatherData[] = [];
  const now = new Date();
  for (let d = 0; d < 30; d++) {
    const date = new Date(now);
    date.setDate(date.getDate() - d);
    for (const zone of zones) {
      weather.push({
        zoneId: zone.id,
        temperature: 25 + Math.random() * 15,
        rainfall: Math.random() > 0.8 ? Math.random() * 50 : 0,
        aqi: 50 + Math.random() * 300,
        windSpeed: 5 + Math.random() * 20,
        visibility: 2 + Math.random() * 8,
        timestamp: date.toISOString(),
        source: 'real',
      });
    }
  }
  return weather;
}

async function main() {
  console.log('Generating mock data...');
  const zones = generateZones();
  const workers = generateWorkers(zones);
  const weather = generateWeather(zones);

  writeData('zones.json', zones);
  writeData('workers.json', workers);
  writeData('weather.json', weather);
  writeData('policies.json', []);
  writeData('claims.json', []);
  writeData('events.json', []);
  writeData('payments.json', []);
  writeData('fraud_alerts.json', []);

  console.log('Mock data generated successfully in data/ folder.');
}

main().catch(console.error);
