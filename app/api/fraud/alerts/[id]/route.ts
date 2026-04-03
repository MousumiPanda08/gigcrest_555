import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/db";

export const runtime = "nodejs";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { resolution } = await req.json();
    const alerts = readData<any>("fraud_alerts.json"); // or "fraud_alerts" if you updated db.ts to auto-add .json
writeData("fraud_alerts.json", alerts);
    const index = alerts.findIndex((a: any) => a.id === params.id);

    if (index === -1) {
      return NextResponse.json({ error: "Alert not found" }, { status: 404 });
    }

    alerts[index] = {
      ...alerts[index],
      status: "resolved",
      resolution,
      resolvedAt: new Date().toISOString(),
    };

    await writeData("fraud_alerts", alerts);
    return NextResponse.json({ success: true, data: alerts[index] });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}