import { NextRequest, NextResponse } from "next/server";
import { calculatePremium } from "@/lib/premium-calculator";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const premium = calculatePremium(body);
    return NextResponse.json({ success: true, premium });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}