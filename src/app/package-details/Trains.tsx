// Trains.tsx
import React, { useEffect, useState } from "react";

interface TrainsProps {
    origin: string;
    destination: string;
    departureDate?: string | string[];
    arrivalDate?: string | string[];
  }

const Trains: React.FC<TrainsProps> = ({ origin, destination }) => {
  const [trains, setTrains] = useState<any[]>([]);
  const apiKey = process.env.NEXT_PUBLIC_TRAIN_API_KEY as string; // Replace with your actual train API

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await fetch(`https://api.example.com/trains?from=${origin}&to=${destination}&key=${apiKey}`); // Replace with actual train API
        const data = await response.json();
        setTrains(data.results);
      } catch (error) {
        console.error("Error fetching trains:", error);
      }
    };

    if (origin && destination) {
      fetchTrains();
    }
  }, [origin, destination, apiKey]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mt-4">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">Trains</h2>
      <ul className="mt-2">
        {trains.map((train, index) => (
          <li key={index} className="text-gray-800 dark:text-gray-200">
            {train.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trains;
