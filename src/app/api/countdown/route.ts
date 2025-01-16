import { type NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/startMongo";

const SECRET_KEY = process.env.SECRET_KEY!;

interface CountdownBody {
  secretKey: string;
  countdownTime?: number;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CountdownBody;
    const { secretKey, countdownTime } = body;

    if (!secretKey || secretKey !== SECRET_KEY) {
      return NextResponse.json(
        { message: "Invalid secret key" },
        { status: 403 },
      );
    }

    if (
      !countdownTime ||
      typeof countdownTime !== "number" ||
      countdownTime <= 0
    ) {
      return NextResponse.json(
        { message: "Invalid countdown time" },
        { status: 400 },
      );
    }

    const client = await clientPromise;
    const db = client.db("countdown");
    const countdownCollection = db.collection<{ _id: number; endTime: number }>(
      "countdown"
    );

    const existingCountdown = await countdownCollection.findOne({ _id: 1 });

    if (existingCountdown && existingCountdown.endTime > Date.now()) {
      const remainingTime = Math.floor(
        (existingCountdown.endTime - Date.now()) / 1000,
      );
      return NextResponse.json(
        { message: "Timer already running", remainingTime },
        { status: 200 },
      );
    }

    const countdownEndTime = Date.now() + countdownTime * 1000;

    await countdownCollection.updateOne(
      { _id: 1 },
      { $set: { endTime: countdownEndTime } },
      { upsert: true },
    );

    return NextResponse.json(
      { message: "Timer started", countdownEndTime },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error starting countdown:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("countdown");
    const countdownCollection = db.collection<{ _id: number; endTime: number }>(
      "countdown",
    );

    const countdown = await countdownCollection.findOne({ _id: 1 });

    if (!countdown || !countdown.endTime) {
      return NextResponse.json(
        { message: "Timer not started yet", remainingTime: 0 },
        { status: 400 },
      );
    }

    const remainingTime = countdown.endTime - Date.now();

    if (remainingTime <= 0) {
      await countdownCollection.deleteOne({ _id: 1 });
      return NextResponse.json(
        { message: "Countdown ended", remainingTime: 0 },
        { status: 200 },
      );
    }

    return NextResponse.json(
      {
        message: "Countdown active",
        remainingTime: Math.floor(remainingTime / 1000),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching countdown:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = (await req.json()) as { secretKey: string };
    const { secretKey } = body;

    if (!secretKey || secretKey !== SECRET_KEY) {
      return NextResponse.json(
        { message: "Invalid secret key" },
        { status: 403 },
      );
    }

    const client = await clientPromise;
    const db = client.db("countdown");
    const countdownCollection = db.collection<{ _id: number; endTime: number }>(
      "countdown",
    );

    const countdown = await countdownCollection.findOne({ _id: 1 });

    if (!countdown || !countdown.endTime) {
      return NextResponse.json(
        { message: "No active countdown to stop" },
        { status: 400 },
      );
    }

    await countdownCollection.deleteOne({ _id: 1 });

    return NextResponse.json(
      { message: "Countdown stopped", remainingTime: 0 },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error stopping countdown:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
