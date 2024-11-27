import React, { useEffect, useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import useWindowDimensions from "@/helpers/useWindowDimensions";

interface Flight {
  airline: string;
  airlineLogo: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  duration: number;
  price: number;
  roundType: string;
}

interface FlightsProps {
  origin: string;
  destination: string;
  departureDate?: string | string[];
  arrivalDate?: string | string[];
  onChooseItem: (item: { title: string; type: string; details: Flight }) => void;
  chosenItems: { title: string; type: string; details: Flight }[];
}

const Flights: React.FC<FlightsProps> = ({
  origin,
  destination,
  departureDate,
  arrivalDate,
  onChooseItem,
  chosenItems,
}) => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const { width } = useWindowDimensions();

  const itemsPerPage = width >= 1024 ? 4 : width >= 768 ? 3 : width >= 640 ? 2 : 1;

  const fetchFlights = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/flights-api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origin, destination, departureDate, arrivalDate }),
      });
      const data = await response.json();
      setFlights(data.results || []);
    } catch (error) {
      console.error("Error fetching flights:", error);
      setFlights([]);
    } finally {
      setLoading(false);
    }
  }, [origin, destination, departureDate, arrivalDate]);

  useEffect(() => {
    if (origin && destination) fetchFlights();
  }, [origin, destination, departureDate, arrivalDate, fetchFlights]);

  const handleNext = () => {
    if (currentIndex + itemsPerPage < flights.length) {
      setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
    }
  };

  const isChosen = (flightNumber: string) =>
    chosenItems.some((item) => item.title === flightNumber && item.type === "flight");

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mt-4 flex-1">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white text-center">Flights</h2>

      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-400">Loading flights...</div>
      ) : flights.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400">
          No flights found for the selected route.
        </div>
      ) : (
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="text-gray-500 dark:text-gray-400 disabled:opacity-50"
            aria-label="Previous flights"
            title="Previous flights"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>

          <div className="overflow-hidden w-full">
            <ul
              className="flex transition-transform"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
                transition: "transform 0.3s ease-in-out",
              }}
            >
              {flights.map((flight, index) => (
                <li
                  key={index}
                  className={`border dark:border-gray-700 rounded-lg shadow-md overflow-hidden flex-shrink-0 mx-2 ${
                    itemsPerPage === 1 ? "min-w-full" : `min-w-[calc(100%/${itemsPerPage})]`
                  }`}
                >
                  <Image
                    src={flight.airlineLogo || "/placeholder-image.png"}
                    alt={flight.airline}
                    width={300}
                    height={200}
                    className="w-auto h-auto object-cover mx-auto"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {flight.airline} {flight.flightNumber}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>From:</strong> {flight.departureAirport}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>To:</strong> {flight.arrivalAirport}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Departure:</strong> {flight.departureTime}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Arrival:</strong> {flight.arrivalTime}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Duration:</strong> {flight.duration} minutes
                    </p>
                    <div className="flex justify-between mt-2">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <strong>Price:</strong> ₹{flight.price} ({flight.roundType})
                      </p>
                      <button
                        onClick={() =>
                          onChooseItem({
                            title: flight.flightNumber,
                            type: "flight",
                            details: flight,
                          })
                        }
                        className={`p-2 rounded-lg transition ${
                          isChosen(flight.flightNumber)
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-green-500 hover:bg-green-600"
                        } text-white`}
                        aria-label={isChosen(flight.flightNumber) ? "Remove this flight" : "Add this flight"}
                        title={isChosen(flight.flightNumber) ? "Remove this flight" : "Add this flight"}
                      >
                        {isChosen(flight.flightNumber) ? "Remove" : "Add"}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex + itemsPerPage >= flights.length}
            className="text-gray-500 dark:text-gray-400 disabled:opacity-50"
            aria-label="Next flights"
            title="Next flights"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Flights;
