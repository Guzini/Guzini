import React from "react";
import type { FlightItinerary } from "@/lib/providers/types";

export function FlightCard({ itinerary }: { itinerary: FlightItinerary }) {
  const first = itinerary.segments[0];
  const last = itinerary.segments[itinerary.segments.length - 1];
  const durationTotal = itinerary.segments.reduce((sum, s) => sum + s.durationMinutes, 0);
  const stops = itinerary.segments.length - 1;

  function fmtTime(iso: string) {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
      <div className="space-y-1">
        <div className="text-sm text-gray-600">
          {first.from} → {last.to}
        </div>
        <div className="text-lg font-semibold">
          {fmtTime(first.departAt)} — {fmtTime(last.arriveAt)}
        </div>
        <div className="text-sm text-gray-600">
          {stops === 0 ? "Без пересадок" : `${stops} пересадк${stops === 1 ? "а" : "и"}`}, {Math.round(durationTotal / 60)} ч {durationTotal % 60} мин
        </div>
        <div className="text-xs text-gray-500">
          {itinerary.airline} {itinerary.fareBrand.toUpperCase()}
        </div>
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold">
          {itinerary.price.toLocaleString("ru-RU")} {itinerary.currency}
        </div>
        <button className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">Купить</button>
      </div>
    </div>
  );
}