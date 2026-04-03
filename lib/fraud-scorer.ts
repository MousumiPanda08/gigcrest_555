export interface FraudScoreResult {
  totalScore: number;
  flags: { type: string; score: number; detail: string }[];
}

export function scoreClaim(claimData: any, context: any): FraudScoreResult {
  const flags: { type: string; score: number; detail: string }[] = [];
  let totalScore = 0;

  // 1. Location Spoofing Check (Mocked)
  if (context.distanceMismatch > 5) {
    const score = 40;
    flags.push({ type: 'location_spoofing', score, detail: `Distance mismatch: ${context.distanceMismatch}km` });
    totalScore += score;
  }

  // 2. Device Integrity (Mocked)
  if (context.isRooted) {
    const score = 30;
    flags.push({ type: 'device_integrity', score, detail: 'Device is rooted/jailbroken' });
    totalScore += score;
  }

  // 3. Multiple Accounts (Mocked)
  if (context.similarUpiFound) {
    const score = 25;
    flags.push({ type: 'multi_account', score, detail: 'UPI ID linked to multiple workers' });
    totalScore += score;
  }

  // 4. Impossible Travel (Mocked)
  if (context.impossibleTravel) {
    const score = 50;
    flags.push({ type: 'impossible_travel', score, detail: 'Impossible travel detected between claims' });
    totalScore += score;
  }

  return {
    totalScore: Math.min(totalScore, 100),
    flags
  };
}
