'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import debounce from 'lodash/debounce';

interface Prediction {
  description: string;
}

export default function Hero() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [whereTo, setWhereTo] = useState('');
  const [autocompleteResults, setAutocompleteResults] = useState<Prediction[]>([]);

  const apiKey = process.env.NEXT_PUBLIC_GOMAPS_API_KEY as string;
  
  const fetchSuggestions = debounce(async (inputText: string) => {
    if (inputText.length > 2) {
      try {
        const response = await fetch(`https://maps.gomaps.pro/maps/api/place/queryautocomplete/json?input=${encodeURIComponent(inputText)}&key=${apiKey}`);
        const data = await response.json();
        setAutocompleteResults(data.predictions || []);
      } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error);
      }
    } else {
      setAutocompleteResults([]);
    }
  }, 300);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isLoggedIn) {
      toast.info("Please log in first to use this feature.");
      return;
    }

    const inputText = e.target.value;
    setWhereTo(inputText);
    fetchSuggestions(inputText);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setWhereTo(suggestion);
    setAutocompleteResults([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.info("Please log in first to use this feature.");
      return;
    }

    const travelType = (document.getElementById("travel-type") as HTMLSelectElement).value;
    const duration = (document.getElementById("duration") as HTMLSelectElement).value;
    const activity = travelType.toLowerCase();

    router.push(
      `/build_pkg?whereTo=${encodeURIComponent(whereTo)}&travelType=${encodeURIComponent(travelType)}&duration=${encodeURIComponent(duration)}&activity=${encodeURIComponent(activity)}`
    );
  };

  return (
    <section className="relative h-screen bg-cover bg-center transition-all duration-500" style={{ backgroundImage: 'url("./Front picture.jpg")' }}>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center md:items-start w-full md:w-1/2 justify-center h-full text-center text-white">
  <h1 className="text-3xl md:text-4xl font-bold">
    Two roads diverged into woods, and I took the one less traveled by.
  </h1>
  <form onSubmit={handleSubmit} className="mt-8 flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-2 bg-gray-500 p-5 rounded-md relative">
  <label htmlFor="where-to" className="sr-only">Where to?</label>
  <div className="relative w-full">
    <input
      id="where-to"
      type="text"
      placeholder="Where to?"
      className="px-4 py-2 text-white bg-gray-600 dark:bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
      value={whereTo}
      onChange={handleInput}
      required
    />
    {autocompleteResults.length > 0 && (
      <ul className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow-lg divide-y divide-gray-200 dark:divide-gray-700 max-h-48 overflow-y-auto z-50">
        {autocompleteResults.map((result, index) => (
          <li
            key={index}
            className="px-4 py-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            onClick={() => handleSuggestionClick(result.description)}
          >
            {result.description}
          </li>
        ))}
      </ul>
    )}
  </div>

  <label htmlFor="travel-type" className="sr-only">Travel Type</label>
  <select id="travel-type" className="px-4 py-2 text-white bg-gray-600 dark:bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-pink-500">
    <option value="">Travel Type</option>
    <option value="Adventure">Adventure</option>
    <option value="Relaxation">Relaxation</option>
  </select>

  <label htmlFor="duration" className="sr-only">Duration</label>
  <select id="duration" className="px-4 py-2 text-white bg-gray-600 dark:bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-pink-500">
    <option value="">Duration</option>
    <option value="1-3 days">1-3 days</option>
    <option value="4-7 days">4-7 days</option>
  </select>

  <button type="submit" className="px-4 py-2 bg-pink-500 rounded text-white hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400">
    Submit
  </button>
</form>

</div>

    </section>
  );
}
