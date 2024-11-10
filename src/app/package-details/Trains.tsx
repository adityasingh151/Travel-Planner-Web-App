import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import useWindowDimensions from "@/helpers/useWindowDimensions";

interface TrainProps {
  origin: string;
  destination: string;
  departureDate: string;
  arrivalDate: string;
  chosenItems: any[]; // Accept chosen items as a prop
  onChooseItem: (item: { title: string; type: string; details: any }) => void;
}

interface Stop {
  name: string;
  time: string;
}

interface Train {
  title: string;
  start_stop: Stop;
  end_stop: Stop;
  formatted_duration: string;
  stops: Stop[];
}

const Trains: React.FC<TrainProps> = ({
  origin,
  destination,
  onChooseItem,
  chosenItems,
}) => {
  const [trains, setTrains] = useState<Train[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [chosenTrain, setChosenTrain] = useState<Train | null>(null); // New local state for chosen train
  const { width } = useWindowDimensions();

  let itemsPerPage = width >= 1024 ? 4 : width >= 768 ? 3 : width >= 640 ? 2 : 1;

  const fetchTrains = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/trains-api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origin, destination }),
      });
      const data = await response.json();

      const indianRailwaysTrains = (data.results.directions || [])
        .map((direction: { trips: any[] }) => {
          const filteredTrips = (direction.trips || []).filter(
            (trip: any) =>
              trip.travel_mode === "Transit" &&
              trip.service_run_by?.name === "Indian Railways"
          );

          return filteredTrips.length > 0
            ? {
                title: filteredTrips[0].title,
                start_stop: filteredTrips[0].start_stop,
                end_stop: filteredTrips[0].end_stop,
                formatted_duration: filteredTrips[0].formatted_duration,
                stops: filteredTrips[0].stops,
              }
            : null;
        })
        .filter(Boolean) as Train[];

      const uniqueTrains = Array.from(
        new Map(indianRailwaysTrains.map((train) => [train.title, train])).values()
      );

      setTrains(uniqueTrains);
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
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const handleShowRoute = (train: Train) => {
    setSelectedTrain(train);
    setShowModal(true);
  };

  const handleChoose = (train: Train) => {
    const isChosen = chosenTrain && chosenTrain.title === train.title;
    
    if (isChosen) {
        // Deselect the train if it's already chosen
        setChosenTrain(null);
    } else {
        // Set the new chosen train
        setChosenTrain(train);
    }

    onChooseItem({ title: train.title, type: "train", details: train });
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
          <button onClick={handlePrev} disabled={currentIndex === 0} className="text-gray-500 dark:text-gray-400">
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div className="overflow-hidden w-full">
            <ul
              className="flex transition-transform"
              style={{
                transform: `translateX(-${(currentIndex / itemsPerPage) * 100}%)`,
                transition: "transform 0.3s ease-in-out",
              }}
            >
              {trains.map((train, index) => {
                const isChosen = chosenTrain && chosenTrain.title === train.title;

                return (
                  <li key={index} className="border justify-between dark:border-gray-700 rounded-lg shadow-md overflow-hidden flex-shrink-0 mx-2" style={{ minWidth: `calc(100% / ${itemsPerPage})` }}>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {train.title.length > 30 ? `${train.title.slice(0, 30)}...` : train.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300"><span className="font-semibold text-gray-800 dark:text-white">Departure:</span> {train.start_stop.name} at {train.start_stop.time}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300"><span className="font-semibold text-gray-800 dark:text-white">Arrival:</span> {train.end_stop.name} at {train.end_stop.time}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300"><span className="font-semibold text-gray-800 dark:text-white">Duration:</span> {train.formatted_duration}</p>
                      <div className="flex justify-between">

                      <button onClick={() => handleShowRoute(train)} className="mt-2 p-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition">Show Route</button>
                      <button 
                        onClick={() => handleChoose(train)} 
                        className={`mt-2 p-2 rounded-lg transition ${
                          isChosen ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                        } text-white`}
                        >
                        {isChosen ? "Remove" : "Add"}
                      </button>
                        </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <button onClick={handleNext} disabled={currentIndex + itemsPerPage >= trains.length} className="text-gray-500 dark:text-gray-400">
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      )}

      {showModal && selectedTrain && (
         <>
         <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>
         <dialog role="dialog" aria-labelledby="modal-title" aria-describedby="modal-desc" id="my_modal_5" className="modal modal-bottom sm:modal-middle" open>
           <div className="modal-box p-6 rounded-lg z-50 relative bg-white dark:bg-gray-800 shadow-lg">
             <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-4">{selectedTrain.title}</h3>
             <p className="text-md text-gray-700 dark:text-gray-300 mb-4">
               <span className="font-semibold">Departure:</span> {selectedTrain.start_stop.name} at {selectedTrain.start_stop.time}
             </p>
             <p className="text-md text-gray-700 dark:text-gray-300 mb-4">
               <span className="font-semibold">Arrival:</span> {selectedTrain.end_stop.name} at {selectedTrain.end_stop.time}
             </p>
             <p className="text-md text-gray-700 dark:text-gray-300 mb-4">
               <span className="font-semibold">Duration:</span> {selectedTrain.formatted_duration}
             </p>
             <h4 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">Stops:</h4>
             <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
               {selectedTrain.stops.map((stop, index) => (
                 <li key={index}>{stop.name} at {stop.time}</li>
               ))}
             </ul>
             <div className="modal-action">
               <button onClick={() => setShowModal(false)} className="mt-4 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Close</button>
             </div>
           </div>
         </dialog>
       </>
      )}
    </div>
  );
};

export default Trains;
