// Hotels.tsx
import React, { useEffect, useState } from "react";

interface HotelsProps {
    destinationCity: string;
    checkInDate?: string | string[];
    checkOutDate?: string | string[];
  }

const Hotels: React.FC<HotelsProps> = ({ destinationCity, checkInDate, checkOutDate}) => {
  const [hotels, setHotels] = useState<any[]>([]);
  const apiKey = process.env.NEXT_PUBLIC_GOMAPS_API_KEY as string; // Replace with your actual hotel API

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch(`https://serpapi.com/search.json?engine=google_hotels&q=${destinationCity}&check_in_date=${checkInDate}&check_out_date=${checkOutDate}&adults=2&currency=INR&gl=us&hl=en&api_key=${apiKey}`); // Replace with actual hotel API
        const data = await response.json();
        setHotels(data.results);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    if (destinationCity) {
      fetchHotels();
    }
  }, [destinationCity, apiKey]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mt-4">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">Hotels</h2>
      <ul className="mt-2">
        {hotels.map((hotel, index) => (
          <li key={index} className="text-gray-800 dark:text-gray-200">
            {hotel.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Hotels;
