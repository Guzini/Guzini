import { type FlightItinerary, type FlightSearchRequest } from "./types";

function addMinutes(isoDate: string, minutes: number) {
  const d = new Date(isoDate);
  d.setMinutes(d.getMinutes() + minutes);
  return d.toISOString();
}

export async function searchFlightsMock(req: FlightSearchRequest): Promise<FlightItinerary[]> {
  const basePrice = req.cabin === "business" ? 25000 : 8000;
  const rand = seed(`${req.origin}${req.destination}${req.date}`);
  const airlines = ["SU", "S7", "U6", "DP"] as const;
  const airline = airlines[Math.floor(rand() * airlines.length)];

  const departBase = new Date(`${req.date}T07:00:00.000Z`);
  const itineraries: FlightItinerary[] = [];

  for (let i = 0; i < 4; i++) {
    const departAt = new Date(departBase);
    departAt.setHours(departBase.getHours() + i * 3 + Math.floor(rand() * 2));
    const duration = 60 + Math.floor(rand() * 120);
    const priceNoise = Math.floor(rand() * 4000) - 1000;
    itineraries.push({
      id: `${airline}-${i}`,
      airline,
      fareBrand: req.cabin,
      price: Math.max(3000, basePrice + priceNoise) * req.passengers,
      currency: "RUB",
      segments: [
        {
          from: req.origin.toUpperCase(),
          to: req.destination.toUpperCase(),
          departAt: departAt.toISOString(),
          arriveAt: addMinutes(departAt.toISOString(), duration),
          airline,
          flightNumber: `${airline}${100 + i}`,
          durationMinutes: duration,
        },
      ],
    });
  }

  const departAt = new Date(departBase);
  departAt.setHours(departBase.getHours() + 2);
  const firstDuration = 50 + Math.floor(rand() * 60);
  const layover = 40 + Math.floor(rand() * 60);
  const secondDuration = 50 + Math.floor(rand() * 70);
  const mid = "KZN";

  itineraries.push({
    id: `${airline}-conn`,
    airline,
    fareBrand: req.cabin,
    price: Math.max(3000, basePrice + 1500) * req.passengers,
    currency: "RUB",
    segments: [
      {
        from: req.origin.toUpperCase(),
        to: mid,
        departAt: departAt.toISOString(),
        arriveAt: addMinutes(departAt.toISOString(), firstDuration),
        airline,
        flightNumber: `${airline}${301}`,
        durationMinutes: firstDuration,
      },
      {
        from: mid,
        to: req.destination.toUpperCase(),
        departAt: addMinutes(addMinutes(departAt.toISOString(), firstDuration), layover),
        arriveAt: addMinutes(addMinutes(addMinutes(departAt.toISOString(), firstDuration), layover), secondDuration),
        airline,
        flightNumber: `${airline}${302}`,
        durationMinutes: secondDuration,
      },
    ],
  });

  return itineraries.sort((a, b) => a.price - b.price);
}

function seed(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  let state = h >>> 0;
  return function random() {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 0xffffffff;
  };
}