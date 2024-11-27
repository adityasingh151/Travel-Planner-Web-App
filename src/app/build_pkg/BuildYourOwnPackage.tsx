"use client"; // Ensure this is a client component in Next.js

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import debounce from "lodash/debounce";


interface Prediction {
  description: string;
}

const BuildYourOwnPackage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [originRegion, setOriginRegion] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [maxDays, setMaxDays] = useState<number | null>(null);
  const [guests, setGuests] = useState(1);
  const [activities, setActivities] = useState({
    culture: false,
    outdoors: false,
    romantic: false,
    religious: false,
    shopping: false,
    business: false,
    traditions: false,
    relaxation: false,
    hiking: false,
    museums: false,
    adventure: false,
    wildlife: false,
    fishing: false,
    cruise: false,
    healthcare: false,
    accommodation: false,
  });

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

  useEffect(() => {
    const whereTo = searchParams.get("whereTo");
    const activity = searchParams.get("activity");
    const duration = searchParams.get("duration");

    if (whereTo) setDestinationCity(whereTo);

    if (activity) {
      setActivities((prev) => ({
        ...prev,
        [activity.toLowerCase()]: true,
      }));
    }

    if (duration) {
      const maxDaysMatch = duration.match(/(\d+)-(\d+)/);
      if (maxDaysMatch) {
        const maxDays = parseInt(maxDaysMatch[2], 10);
        setMaxDays(maxDays);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (startDate && maxDays) {
      const calculatedEndDate = dayjs(startDate).add(maxDays, "day").format("YYYY-MM-DD");
      setEndDate(calculatedEndDate);
    }
  }, [startDate, maxDays]);

  const handleOriginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setOriginRegion(value);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setOriginRegion(suggestion);
    setAutocompleteResults([]);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setActivities((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const queryParams = {
      originRegion,
      destinationCity,
      startDate: startDate || '',
      endDate: endDate || '',
      guests: guests.toString(),
      activities: JSON.stringify(activities),
    };

    router.push(`/package-details?${new URLSearchParams(queryParams).toString()}`);
  };

  return (
    <section className="relative h-screen bg-[url('/Front_picture.jpg')] bg-cover bg-center flex items-center justify-center transition-all duration-500">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute inset-0 backdrop-blur-md bg-opacity-10 w-full justify-items-center mt-20">
        <div className="relative z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-lg w-full text-center">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Build Your Own Package
          </h1>

          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label className="block text-left text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
                Enter Origin (region or city)
              </label>
              <input
                type="text"
                placeholder="Delhi"
                value={originRegion}
                onChange={handleOriginChange}
                className="w-full px-3 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
              {autocompleteResults.length > 0 && (
                <ul className="absolute z-10 w-full bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow-lg mt-1 max-h-60 overflow-y-auto">
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

            <div>
              <label className="block text-left text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
                Enter destination (region, or city)
              </label>
              <input
                type="text"
                placeholder="New Delhi"
                value={destinationCity}
                onChange={(e) => setDestinationCity(e.target.value)}
                className="w-full px-3 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <div className="flex space-x-3">
              <div className="w-1/2">
                <label htmlFor="start-date" className="block text-left text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
                  Start Date
                </label>
                <input
                  id="start-date"
                  type="date"
                  value={startDate || ""}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>

              <div className="w-1/2">
                <label htmlFor="end-date" className="block text-left text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
                  End Date
                </label>
                <input
                  id="end-date"
                  type="date"
                  value={endDate || ""}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="guests" className="block text-left text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
                Guests
              </label>
              <select
                id="guests"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                className="w-full px-3 py-2 border dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="1">1 Adult</option>
                <option value="2">2 Adults</option>
                <option value="3">3 Adults</option>
                <option value="4">4 Adults</option>
              </select>
            </div>

            <div>
              <label className="block text-left text-gray-700 dark:text-gray-300 text-sm font-medium mb-1">
                Activities Preferences (optional)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700 text-sm font-medium dark:text-white">
                {Object.keys(activities).map((activity) => (
                  <label key={activity} className="flex items-center text-gray-700 dark:text-white">
                    <input
                      type="checkbox"
                      name={activity}
                      checked={activities[activity as keyof typeof activities]}
                      onChange={handleCheckboxChange}
                      className="mr-2 text-pink-500 rounded focus:ring-pink-500"
                    />
                    {activity.charAt(0).toUpperCase() + activity.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors"
            >
              Build Package
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BuildYourOwnPackage;
