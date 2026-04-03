import { NextResponse } from 'next/server';
import { runAutoTrigger } from '@/lib/auto-trigger-pipeline';

export async function POST(request: Request) {
  try {
    const { zoneId, eventType, severityTier } = await request.json();

    if (!zoneId || !eventType || !severityTier) {
      return NextResponse.json(
        {
          success: false,
          error: 'zoneId, eventType, and severityTier are required',
        },
        { status: 400 }
      );
    }

    const result = await runAutoTrigger(zoneId, eventType, severityTier);

    const firstEvent = result?.data?.events?.[0];

    return NextResponse.json({
      success: true,
      data: {
        event: firstEvent || null,
        summary: firstEvent?.summary || {
          totalClaims: 0,
          autoApproved: 0,
          manualReview: 0,
          denied: 0,
          totalPayout: 0,
        },
        claims: firstEvent?.claims || [],
        allEvents: result?.data?.events || [],
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to simulate event' },
      { status: 500 }
    );
  }
}