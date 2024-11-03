import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import useWindowDimensions from "@/helpers/useWindowDimensions"; // Helper to detect screen width

interface TrainProps {
  origin: string;
  destination: string;
}

// Define the Train interface to type each train item
interface Train {
  travel_mode: string;
  start_time: string;
  end_time: string;
  distance: number;
  duration: number;
  formatted_distance: string;
  formatted_duration: string;
  trips?: {
    station: string;
  }[];
}

const Trains: React.FC<TrainProps> = ({ origin, destination }) => {
  const [trains, setTrains] = useState<Train[]>([]); // Apply Train[] type here
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const { width } = useWindowDimensions();
  let itemsPerPage = 1;

  if (width >= 1024) itemsPerPage = 4;
  else if (width >= 768) itemsPerPage = 3;
  else if (width >= 640) itemsPerPage = 2;

  const fetchTrains = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/trains-api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ origin, destination }),
      });
      const data = await response.json();
      console.log("DAta: ", data.results.directions)
      setTrains(data.results.directions || []);
      // console.log("trains: ", trains)
    } catch (error) {
      console.error("Error fetching trains:", error);
      setTrains([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (origin && destination) fetchTrains();
  }, [origin, destination]);

  const handleNext = () => {
    if (currentIndex + itemsPerPage < trains.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Apply Train type to the train parameter
  const handleShowRoute = (train: Train) => {
    // console.log("trains: ",train)
    const stations = train.trips?.map((trip) => trip.station).join(" → ");
    alert(`Stations:\n${stations}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mt-4 flex-1">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white text-center">Trains</h2>

      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-400">Loading trains...</div>
      ) : trains.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400">No trains found for the selected route.</div>
      ) : (
        <div className="flex items-center justify-between mt-4">
          <button 
            onClick={handlePrev} 
            disabled={currentIndex === 0} 
            className={`text-gray-500 dark:text-gray-400 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Previous train"
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
              {trains.map((train, index) => (
                <li
                  key={index}
                  className={`border dark:border-gray-700 rounded-lg shadow-md overflow-hidden flex-shrink-0 mx-2 ${
                    itemsPerPage === 1 ? "min-w-full" : `min-w-[calc(100%/${itemsPerPage})]`
                  }`}
                >
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {train.travel_mode} - {train.formatted_distance}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-semibold text-gray-800 dark:text-white">Departure:</span> {train.start_time}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-semibold text-gray-800 dark:text-white">Arrival:</span> {train.end_time}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-semibold text-gray-800 dark:text-white">Duration:</span> {train.formatted_duration}
                    </p>
                    <button
                      onClick={() => handleShowRoute(train)}
                      className="mt-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      Show Route
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <button 
            onClick={handleNext} 
            disabled={currentIndex + itemsPerPage >= trains.length} 
            className={`text-gray-500 dark:text-gray-400 ${currentIndex + itemsPerPage >= trains.length ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Next train"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Trains;
