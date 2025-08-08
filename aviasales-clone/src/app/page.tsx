"use client";
import React, { useState } from "react";
import { SearchForm, type SearchFormValues } from "@/components/SearchForm";
import { FlightCard } from "@/components/FlightCard";
import type { FlightItinerary } from "@/lib/providers/types";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<FlightItinerary[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(values: SearchFormValues) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(`Ошибка поиска (${res.status})`);
      const data = (await res.json()) as { itineraries: FlightItinerary[] };
      setResults(data.itineraries);
    } catch (e: any) {
      setError(e.message ?? "Не удалось выполнить поиск");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container mx-auto max-w-5xl p-4 space-y-6">
      <h1 className="text-3xl font-bold">Aviasales (MVP)</h1>
      <SearchForm onSearch={handleSearch} />
      {loading && <p>Поиск рейсов…</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="space-y-4">
        {results.map((it) => (
          <FlightCard key={it.id} itinerary={it} />
        ))}
        {!loading && results.length === 0 && (
          <p className="text-gray-600">Найдите лучшие варианты перелётов.</p>
        )}
      </div>
    </main>
  );
}