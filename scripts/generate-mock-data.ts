// scripts/init-mock-data.ts
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Sample Zones (20 zones across 3 cities)
const zones = [
  // Mumbai zones
  { id: 'zone_001', name: 'Andheri East', city: 'Mumbai', latitude: 19.1136, longitude: 72.8697, radius: 3000, riskMultiplier: 1.25, riskLevel: 'medium' },
  { id: 'zone_002', name: 'Andheri West', city: 'Mumbai', latitude: 19.1354, longitude: 72.8267, radius: 3000, riskMultiplier: 1.15, riskLevel: 'medium' },
  { id: 'zone_003', name: 'Bandra', city: 'Mumbai', latitude: 19.0596, longitude: 72.8295, radius: 2500, riskMultiplier: 1.35, riskLevel: 'high' },
  { id: 'zone_004', name: 'Powai', city: 'Mumbai', latitude: 19.1176, longitude: 72.9060, radius: 3500, riskMultiplier: 1.10, riskLevel: 'low' },
  { id: 'zone_005', name: 'Malad', city: 'Mumbai', latitude: 19.1869, longitude: 72.8481, radius: 3000, riskMultiplier: 1.20, riskLevel: 'medium' },
  { id: 'zone_006', name: 'Goregaon', city: 'Mumbai', latitude: 19.1663, longitude: 72.8526, radius: 3200, riskMultiplier: 1.22, riskLevel: 'medium' },
  { id: 'zone_007', name: 'Dadar', city: 'Mumbai', latitude: 19.0178, longitude: 72.8478, radius: 2000, riskMultiplier: 1.40, riskLevel: 'high' },
  
  // Delhi zones
  { id: 'zone_008', name: 'Connaught Place', city: 'Delhi', latitude: 28.6315, longitude: 77.2167, radius: 2000, riskMultiplier: 1.45, riskLevel: 'high' },
  { id: 'zone_009', name: 'Rohini', city: 'Delhi', latitude: 28.7499, longitude: 77.0656, radius: 4000, riskMultiplier: 1.30, riskLevel: 'high' },
  { id: 'zone_010', name: 'Dwarka', city: 'Delhi', latitude: 28.5921, longitude: 77.0460, radius: 3500, riskMultiplier: 1.25, riskLevel: 'medium' },
  { id: 'zone_011', name: 'Saket', city: 'Delhi', latitude: 28.5244, longitude: 77.2066, radius: 2500, riskMultiplier: 1.35, riskLevel: 'high' },
  { id: 'zone_012', name: 'Vasant Kunj', city: 'Delhi', latitude: 28.5244, longitude: 77.1519, radius: 3000, riskMultiplier: 1.20, riskLevel: 'medium' },
  { id: 'zone_013', name: 'Karol Bagh', city: 'Delhi', latitude: 28.6510, longitude: 77.1903, radius: 2200, riskMultiplier: 1.38, riskLevel: 'high' },
  
  // Bangalore zones
  { id: 'zone_014', name: 'Koramangala', city: 'Bangalore', latitude: 12.9352, longitude: 77.6245, radius: 3000, riskMultiplier: 1.28, riskLevel: 'medium' },
  { id: 'zone_015', name: 'Indiranagar', city: 'Bangalore', latitude: 12.9784, longitude: 77.6408, radius: 2800, riskMultiplier: 1.32, riskLevel: 'high' },
  { id: 'zone_016', name: 'Whitefield', city: 'Bangalore', latitude: 12.9698, longitude: 77.7499, radius: 4000, riskMultiplier: 1.18, riskLevel: 'medium' },
  { id: 'zone_017', name: 'Bellandur', city: 'Bangalore', latitude: 12.9259, longitude: 77.6743, radius: 3500, riskMultiplier: 1.15, riskLevel: 'low' },
  { id: 'zone_018', name: 'HSR Layout', city: 'Bangalore', latitude: 12.9082, longitude: 77.6476, radius: 2800, riskMultiplier: 1.25, riskLevel: 'medium' },
  { id: 'zone_019', name: 'Electronic City', city: 'Bangalore', latitude: 12.8458, longitude: 77.6593, radius: 4500, riskMultiplier: 1.12, riskLevel: 'low' },
  { id: 'zone_020', name: 'Marathahalli', city: 'Bangalore', latitude: 12.9591, longitude: 77.6974, radius: 3200, riskMultiplier: 1.22, riskLevel: 'medium' }
].map(z => ({ ...z, createdAt: new Date().toISOString() }));

// Sample Workers (100 workers)
const generateWorkers = () => {
  const workers = [];
  const names = ['Rajesh Kumar', 'Amit Singh', 'Priya Sharma', 'Mohammed Ali', 'Suresh Patel', 'Anjali Verma', 'Vikram Rao'];
  const platforms = ['swiggy', 'zomato', 'both', 'other'] as const;
  const vehicles = ['bike', 'bicycle', 'e-bike'] as const;
  
  for (let i = 1; i <= 100; i++) {
    const city = i <= 35 ? 'Mumbai' : i <= 70 ? 'Delhi' : 'Bangalore';
    const cityZones = zones.filter(z => z.city === city);
    const zone = cityZones[Math.floor(Math.random() * cityZones.length)];
    
    workers.push({
      id: `worker_${String(i).padStart(4, '0')}`,
      name: `${names[i % names.length]} ${i}`,
      phone: `9${String(8000000000 + i).slice(1)}`,
      city,
      primaryZoneId: zone.id,
      platform: platforms[Math.floor(Math.random() * platforms.length)],
      vehicleType: vehicles[Math.floor(Math.random() * vehicles.length)],
      avgDailyEarning: 500 + Math.floor(Math.random() * 500),
      avgHoursPerDay: 6 + Math.floor(Math.random() * 6),
      daysPerWeek: 5 + Math.floor(Math.random() * 2),
      experienceMonths: 1 + Math.floor(Math.random() * 60),
      upiId: `worker${i}@upi`,
      createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active'
    });
  }
  
  return workers;
};

// Sample Weather Data (30 days)
const generateWeather = () => {
  const weather = [];
  const now = Date.now();
  
  for (let day = 0; day < 30; day++) {
    zones.forEach(zone => {
      const timestamp = new Date(now - (day * 24 * 60 * 60 * 1000));
      
      weather.push({
        id: `weather_${zone.id}_${day}`,
        zoneId: zone.id,
        timestamp: timestamp.toISOString(),
        temperature: 20 + Math.random() * 20,
        rainfall: Math.random() * 30,
        aqi: 50 + Math.random() * 300,
        windSpeed: 5 + Math.random() * 30,
        visibility: 1 + Math.random() * 9,
        weatherCondition: ['Clear', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
        source: 'simulation' as const
      });
    });
  }
  
  return weather;
};

// Sample Policies (20 active policies)
const generatePolicies = (workers: any[]) => {
  const policies = [];
  
  for (let i = 1; i <= 20; i++) {
    const worker = workers[i - 1];
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    policies.push({
      id: `policy_${String(i).padStart(4, '0')}`,
      workerId: worker.id,
      weekStart: weekStart.toISOString(),
      weekEnd: weekEnd.toISOString(),
      coveragePercentage: 75,
      maxDailyPayout: 600,
      maxWeeklyPayouts: 3,
      maxMonthlyPayouts: 8,
      basePremium: 99,
      zoneLoading: 15 + Math.floor(Math.random() * 30),
      seasonLoading: 10 + Math.floor(Math.random() * 20),
      platformLoading: 5 + Math.floor(Math.random() * 15),
      behavioralDiscount: Math.floor(Math.random() * 20),
      finalPremium: 99 + Math.floor(Math.random() * 100),
      status: 'active' as const,
      paymentStatus: 'paid' as const,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    });
  }
  
  return policies;
};

// Sample Claims (15 historical claims)
const generateClaims = (policies: any[], workers: any[]) => {
  const claims = [];
  const eventTypes = ['heavy_rain', 'extreme_heat', 'pollution', 'flood'];
  const severityTiers = ['T1', 'T2', 'T3', 'T4'] as const;
  const statuses = ['paid', 'auto_approved', 'approved', 'manual_review'] as const;
  
  for (let i = 1; i <= 15; i++) {
    const policy = policies[i % policies.length];
    const worker = workers.find((w: any) => w.id === policy.workerId);
    const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    const severityTier = severityTiers[Math.floor(Math.random() * severityTiers.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    const severityFactors: Record<string, number> = { T1: 0.30, T2: 0.60, T3: 0.85, T4: 1.00 };
    const hoursAffected = 2 + Math.floor(Math.random() * 6);
    const hoursRatio = hoursAffected / worker.avgHoursPerDay;
    const calculatedPayout = Math.round(
      worker.avgDailyEarning * 
      (policy.coveragePercentage / 100) * 
      severityFactors[severityTier] * 
      hoursRatio
    );
    const approvedPayout = Math.min(calculatedPayout, policy.maxDailyPayout);
    
    claims.push({
      id: `claim_${String(i).padStart(4, '0')}`,
      policyId: policy.id,
      workerId: worker.id,
      workerName: worker.name,
      eventId: `event_${String(i).padStart(4, '0')}`,
      claimDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      eventType,
      severityTier,
      dailyEarningBasis: worker.avgDailyEarning,
      coveragePercentage: policy.coveragePercentage,
      severityFactor: severityFactors[severityTier],
      hoursAffected,
      hoursRatio,
      calculatedPayout,
      approvedPayout: status === 'denied' ? 0 : approvedPayout,
      fraudScore: Math.floor(Math.random() * 60),
      fraudFlags: [],
      status,
      paymentStatus: status === 'paid' || status === 'auto_approved' ? 'completed' : 'pending',
      paymentId: status === 'paid' || status === 'auto_approved' ? `TXN_GS_${Date.now()}_${Math.random().toString(36).substr(2, 6)}` : null,
      paidAt: status === 'paid' || status === 'auto_approved' ? new Date().toISOString() : null,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
    });
  }
  
  return claims;
};

// Sample Events (5 historical events)
const generateEvents = () => {
  const events = [];
  const eventTypes = ['heavy_rain', 'extreme_heat', 'pollution', 'flood', 'strike'];
  const severityTiers = ['T1', 'T2', 'T3', 'T4'] as const;
  
  for (let i = 1; i <= 5; i++) {
    const zone = zones[Math.floor(Math.random() * zones.length)];
    const eventType = eventTypes[i - 1];
    const severityTier = severityTiers[Math.floor(Math.random() * severityTiers.length)];
    const severityFactors: Record<string, number> = { T1: 0.30, T2: 0.60, T3: 0.85, T4: 1.00 };
    
    events.push({
      id: `event_${String(i).padStart(4, '0')}`,
      eventType,
      severityTier,
      severityFactor: severityFactors[severityTier],
      zoneId: zone.id,
      zoneName: zone.name,
      city: zone.city,
      eventStart: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString(),
      eventEnd: i <= 3 ? new Date(Date.now() - Math.random() * 5 * 24 * 60 * 60 * 1000).toISOString() : null,
      durationHours: 2 + Math.floor(Math.random() * 6),
      measurements: {
        rainfall: eventType.includes('rain') ? 20 + Math.random() * 80 : 0,
        temperature: eventType.includes('heat') ? 40 + Math.random() * 8 : 25 + Math.random() * 10,
        aqi: eventType.includes('pollution') ? 300 + Math.random() * 200 : 100 + Math.random() * 150,
        windSpeed: 10 + Math.random() * 40
      },
      isVerified: true,
      claimsGenerated: Math.floor(Math.random() * 30) + 5,
      totalPayoutAmount: Math.floor(Math.random() * 10000) + 2000,
      createdAt: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString()
    });
  }
  
  return events;
};

// Sample Payments (10 completed)
const generatePayments = (claims: any[]) => {
  const paidClaims = claims.filter((c: any) => c.paymentId);
  
  return paidClaims.slice(0, 10).map((claim: any, i: number) => ({
    id: claim.paymentId,
    claimId: claim.id,
    workerId: claim.workerId,
    amount: claim.approvedPayout,
    method: 'upi',
    upiId: `worker${i}@upi`,
    status: 'completed',
    transactionId: `UPI${Date.now()}${Math.random().toString(36).substr(2, 6)}`,
    createdAt: claim.createdAt,
    completedAt: claim.paidAt
  }));
};

// Sample Fraud Alerts (3 sample alerts)
const generateFraudAlerts = (claims: any[]) => {
  const suspiciousClaims = claims.filter((c: any) => c.fraudScore > 45).slice(0, 3);
  
  return suspiciousClaims.map((claim: any, i: number) => ({
    id: `fraud_alert_${String(i + 1).padStart(4, '0')}`,
    workerId: claim.workerId,
    claimId: claim.id,
    alertType: ['location_spoofing', 'duplicate_claim', 'abnormal_pattern'][i % 3],
    severity: claim.fraudScore > 70 ? 'critical' : claim.fraudScore > 60 ? 'high' : 'medium',
    confidence: claim.fraudScore,
    details: [
      { type: 'gps_mismatch', description: 'GPS location differs from IP location by 15km', score: 25 },
      { type: 'timing_anomaly', description: 'Claim submitted during non-working hours', score: 15 },
      { type: 'pattern_detection', description: 'Similar claim pattern to flagged accounts', score: claim.fraudScore - 40 }
    ],
    status: 'open',
    createdAt: claim.createdAt
  }));
};

// Initialize all data files
const initializeData = () => {
  console.log('🚀 Initializing mock data...');
  
  // Generate data
  const workers = generateWorkers();
  const policies = generatePolicies(workers);
  const claims = generateClaims(policies, workers);
  const events = generateEvents();
  const payments = generatePayments(claims);
  const fraudAlerts = generateFraudAlerts(claims);
  const weather = generateWeather();
  
  // Write to files
  fs.writeFileSync(path.join(DATA_DIR, 'zones.json'), JSON.stringify(zones, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'workers.json'), JSON.stringify(workers, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'policies.json'), JSON.stringify(policies, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'claims.json'), JSON.stringify(claims, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'events.json'), JSON.stringify(events, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'payments.json'), JSON.stringify(payments, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'fraud_alerts.json'), JSON.stringify(fraudAlerts, null, 2));
  fs.writeFileSync(path.join(DATA_DIR, 'weather.json'), JSON.stringify(weather, null, 2));
  
  console.log('✅ Mock data initialized successfully!');
  console.log(`   - ${zones.length} zones`);
  console.log(`   - ${workers.length} workers`);
  console.log(`   - ${policies.length} policies`);
  console.log(`   - ${claims.length} claims`);
  console.log(`   - ${events.length} events`);
  console.log(`   - ${payments.length} payments`);
  console.log(`   - ${fraudAlerts.length} fraud alerts`);
  console.log(`   - ${weather.length} weather records`);
};

// Run if executed directly
if (require.main === module) {
  initializeData();
}

export { initializeData };