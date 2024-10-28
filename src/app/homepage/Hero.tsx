// app/homepage/Hero.tsx
"use client"; // Ensure this is a client component

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use the new router from next/navigation

export default function Hero() {
  const router = useRouter();
  const [isBlurred, setIsBlurred] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whereTo = (document.getElementById("where-to") as HTMLInputElement).value;
    const travelType = (document.getElementById("travel-type") as HTMLSelectElement).value;
    const duration = (document.getElementById("duration") as HTMLSelectElement).value;

    // Automatically determine activity based on travel type
    const activity = travelType.toLowerCase();

    router.push(
      `/build_pkg?whereTo=${encodeURIComponent(whereTo)}&travelType=${encodeURIComponent(travelType)}&duration=${encodeURIComponent(duration)}&activity=${encodeURIComponent(activity)}`
    );
  };

  return (
    <section
      className={`relative h-screen bg-cover bg-center transition-all duration-500 ${isBlurred ? 'backdrop-blur-md' : ''}`}
      style={{ backgroundImage: 'url("./Front picture.jpg")' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center w-1/2 justify-center h-full text-center text-white mr-6">
        <h1 className="text-4xl font-bold">
          Two roads diverged into woods, and I took the one less traveled by.
        </h1>
        <form onSubmit={handleSubmit} className="mt-8 flex space-x-2 bg-gray-500 p-5 rounded-md">
          <label htmlFor="where-to" className="sr-only">
            Where to?
          </label>
          <input
            id="where-to"
            type="text"
            placeholder="Where to?"
            className="px-4 py-2 text-white rounded bg-gray-500 "
            required
          />

          <label htmlFor="travel-type" className="sr-only">
            Travel Type
          </label>
          <select id="travel-type" className="px-4 py-2 text-white rounded bg-gray-500 ">
            <option value="">Travel Type</option>
            <option value="Adventure">Adventure</option>
            <option value="Relaxation">Relaxation</option>
          </select>

          <label htmlFor="duration" className="sr-only">
            Duration
          </label>
          <select id="duration" className="px-4 py-2 text-white rounded bg-gray-500 ">
            <option value="">Duration</option>
            <option value="1-3 days">1-3 days</option>
            <option value="4-7 days">4-7 days</option>
          </select>

          <button type="submit" className="px-4 py-2 bg-pink-500 rounded">
            Submit
          </button>
        </form>
      </div>
      <div className="w-1/2"></div>
    </section>
  );
}
