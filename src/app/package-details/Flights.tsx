// Flights.tsx
import React, { useEffect, useState } from "react";

interface FlightsProps {
    origin: string;
    destination: string;
    departureDate?: string | string[];
    arrivalDate?: string | string[];
  }

const Flights: React.FC<FlightsProps> = ({ origin, destination }) => {
  const [flights, setFlights] = useState<any[]>([]);
  const apiKey = process.env.NEXT_PUBLIC_FLIGHT_API_KEY as string; // Replace with your actual flight API

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await fetch(`https://api.example.com/flights?from=${origin}&to=${destination}&key=${apiKey}`); // Replace with actual flight API
        const data = await response.json();
        setFlights(data.results);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    if (origin && destination) {
      fetchFlights();
    }
  }, [origin, destination, apiKey]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mt-4">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">Flights</h2>
      <ul className="mt-2">
        {flights.map((flight, index) => (
          <li key={index} className="text-gray-800 dark:text-gray-200">
            {flight.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Flights;
