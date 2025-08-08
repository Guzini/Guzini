import { NextResponse } from "next/server";
import type { FlightSearchRequest, FlightItinerary } from "@/lib/providers/types";
import { searchFlightsMock } from "@/lib/providers/mockFlights";

export async function POST(request: Request) {
  const body = (await request.json()) as FlightSearchRequest;
  if (!body.origin || !body.destination || !body.date) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const itineraries: FlightItinerary[] = await searchFlightsMock(body);
  return NextResponse.json({ itineraries });
}