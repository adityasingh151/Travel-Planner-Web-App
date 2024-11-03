import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import useWindowDimensions from "@/helpers/useWindowDimensions"; // Helper to detect screen width

interface FlightsProps {
  origin: string;
  destination: string;
  departureDate?: string | string[];
  arrivalDate?: string | string[];
  duration?: string;
  airlineLogo?: string;
}

const Flights: React.FC<FlightsProps> = ({ origin, destination, departureDate, arrivalDate }) => {
  const [flights, setFlights] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const apiKey = process.env.NEXT_PUBLIC_FLIGHT_API_KEY as string;
  const { width } = useWindowDimensions();
  let itemsPerPage = 1;

  if (width >= 1024) itemsPerPage = 4;
  else if (width >= 768) itemsPerPage = 3;
  else if (width >= 640) itemsPerPage = 2;

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/flights-api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
  };

  useEffect(() => {
    if (origin && destination) fetchFlights();
  }, [origin, destination, departureDate, arrivalDate]);

  const handleNext = () => {
    if (currentIndex + itemsPerPage < flights.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mt-4 flex-1">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white text-center">Flights</h2>

      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-400">Loading flights...</div>
      ) : flights.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400">No flights found for the selected route.</div>
      ) : (
        <div className="flex items-center justify-between mt-4">
          <button 
            onClick={handlePrev} 
            disabled={currentIndex === 0} 
            className={`text-gray-500 dark:text-gray-400 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Previous flight"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>

          <div className="overflow-hidden w-full">
            <ul
              className="flex transition-transform"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
                transition: 'transform 0.3s ease-in-out',
              }}
            >
              {flights.map((flight, index) => (
                <li
                  key={index}
                  className={`border dark:border-gray-700 rounded-lg shadow-md overflow-hidden flex-shrink-0 mx-2 ${
                    itemsPerPage === 1 ? "min-w-full" : `min-w-[calc(100%/${itemsPerPage})]`
                  }`}
                >
                  <img
                    src={flight.airlineLogo || "/placeholder-image.png"}
                    alt={flight.airline}
                    className="w-auto h-auto object-fill mx-auto"
                    onError={(e) => (e.currentTarget.src = "/placeholder-image.png")}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {flight.airline} {flight.flightNumber}
                    </h3>
                    {/* <p className="text-sm text-gray-600 dark:text-gray-300"> */}
                      <p className="text-sm text-gray-600 dark:text-gray-300"><span className="font-semibold text-gray-800 dark:text-white">From:</span> {flight.departureAirport} </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300"><span className="font-semibold text-gray-800 dark:text-white"> To:</span> {flight.arrivalAirport}</p>
                    {/* </p> */}
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-semibold text-gray-800 dark:text-white">Departure:</span> {flight.departureTime}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300"><span className="font-semibold text-gray-800 dark:text-white">Arrival:</span> {flight.arrivalTime}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300"><span className="font-semibold text-gray-800 dark:text-white">Duration:</span> {flight.duration} minutes</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300"><span className="font-semibold text-gray-800 dark:text-white">Price:</span> ₹{flight.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <button 
            onClick={handleNext} 
            disabled={currentIndex + itemsPerPage >= flights.length} 
            className={`text-gray-500 dark:text-gray-400 ${currentIndex + itemsPerPage >= flights.length ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Next flight"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Flights;
