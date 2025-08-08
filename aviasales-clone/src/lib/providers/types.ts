export type Segment = {
  from: string;
  to: string;
  departAt: string; // ISO string
  arriveAt: string; // ISO string
  airline: string;
  flightNumber: string;
  durationMinutes: number;
};

export type FlightItinerary = {
  id: string;
  segments: Segment[];
  airline: string;
  fareBrand: "economy" | "business";
  price: number;
  currency: "RUB" | "USD" | "EUR";
};

export type FlightSearchRequest = {
  origin: string; // IATA code
  destination: string; // IATA code
  date: string; // yyyy-mm-dd
  passengers: number;
  cabin: "economy" | "business";
};