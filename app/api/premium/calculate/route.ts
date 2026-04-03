import { NextRequest, NextResponse } from "next/server";
import { calculatePremium } from "@/lib/premium-calculator";
import { readData } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { workerId, zoneId } = body;

    const workers = await readData("workers");
    const zones = await readData("zones");

    const worker = workers.find((w: any) => w.id === workerId);
    const zone = zones.find((z: any) => z.id === zoneId);

    if (!worker || !zone) {
      return NextResponse.json({ error: "Worker or zone not found" }, { status: 404 });
    }

    const premium = calculatePremium({ worker, zone });

    return NextResponse.json({ success: true, premium });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}