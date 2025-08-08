"use client";
import React, { useState } from "react";

export type SearchFormValues = {
  origin: string;
  destination: string;
  date: string;
  passengers: number;
  cabin: "economy" | "business";
};

export function SearchForm({ onSearch }: { onSearch: (values: SearchFormValues) => void }) {
  const today = new Date().toISOString().slice(0, 10);
  const [values, setValues] = useState<SearchFormValues>({
    origin: "MOW",
    destination: "LED",
    date: today,
    passengers: 1,
    cabin: "economy",
  });

  function update<K extends keyof SearchFormValues>(key: K, value: SearchFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch(values);
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-3 bg-white p-4 rounded-xl shadow">
      <input
        className="input"
        placeholder="Откуда (IATA)"
        value={values.origin}
        onChange={(e) => update("origin", e.target.value.toUpperCase().slice(0, 3))}
      />
      <input
        className="input"
        placeholder="Куда (IATA)"
        value={values.destination}
        onChange={(e) => update("destination", e.target.value.toUpperCase().slice(0, 3))}
      />
      <input className="input" type="date" value={values.date} onChange={(e) => update("date", e.target.value)} />
      <input
        className="input"
        type="number"
        min={1}
        max={9}
        value={values.passengers}
        onChange={(e) => update("passengers", Number(e.target.value))}
      />
      <select className="input" value={values.cabin} onChange={(e) => update("cabin", e.target.value as any)}>
        <option value="economy">Эконом</option>
        <option value="business">Бизнес</option>
      </select>
      <div className="md:col-span-5">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Найти
        </button>
      </div>
    </form>
  );
}