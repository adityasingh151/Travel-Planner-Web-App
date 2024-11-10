"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import NearbyPlaces from "./NearbyPlaces";
import Hotels from "./Hotels";
import Trains from "./Trains";
import Flights from "./Flights";
import { useState } from "react";

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

type ChosenItem = {
  title: string;
  type: string;
  details: Train;
};


const PackageDetails: React.FC = () => {
  const searchParams = useSearchParams();

  const originRegion = searchParams.get("originRegion");
  const destinationCity = searchParams.get("destinationCity");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const guests = Number(searchParams.get("guests"));

  const origin = originRegion ?? "";
  const destination = destinationCity ?? "";

  // State to hold chosen items
  const [chosenItems, setChosenItems] = useState<ChosenItem[]>([]);

  // Function to handle item selection
 // Function to handle item selection
 const handleChooseItem = (item: {
  title: string;
  type: string;
  details: any; // Adjusted to store full details of item
}) => {
  setChosenItems((prev) => {
    const isPlaceType = item.type === "place";

    // If item is of type "place," we allow multiple items of this type
    if (isPlaceType) {
      const sameItemExists = prev.find(
        (i) => i.title === item.title && i.type === item.type
      );
      return sameItemExists
        ? prev.filter((i) => i !== sameItemExists) // Remove if exists
        : [...prev, item]; // Add if doesn't exist
    }

    // For types other than "place," allow only one instance of each type
    return [...prev.filter((i) => i.type !== item.type), item];
  });
};



  return (
    <div className="w-full p-0">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 mt-20 text-center">
          Travel Package Details
        </h1>

        {destination && (
          <div>
            <Trains
              origin={origin}
              destination={destination}
              departureDate={startDate ?? ""}
              arrivalDate={endDate ?? ""}
              onChooseItem={handleChooseItem} // Pass the handler to Trains
              chosenItems={chosenItems}
            />
            <NearbyPlaces
             destinationCity={destination}
             onChooseItem={handleChooseItem}
             chosenItems={chosenItems}
            
            />
            <Hotels destinationCity={destination} checkInDate={startDate ?? ""} checkOutDate={endDate ?? ""} guests={guests ?? 2} onChooseItem={handleChooseItem} chosenItems={chosenItems} />
            <Flights origin={origin} destination={destination} departureDate={startDate ?? ""} arrivalDate={endDate ?? ""} onChooseItem={handleChooseItem} chosenItems={chosenItems} />
          </div>
        )}
      </div>

      {/* Button to get itinerary */}
      <div className="flex justify-center mt-4">
        <button
          className={`p-2 bg-blue-500 text-white rounded-lg ${
            chosenItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={chosenItems.length === 0}
          onClick={() => console.log("Get Itinerary:", chosenItems)} // Replace with your itinerary logic
        >
          Get Itinerary
        </button>
      </div>

      {/* Additional Information Section (Optional) */}
      <div className="mt-8 bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">More Information</h2>
        <p className="text-gray-700">
          For more details about your travel package, please contact our support
          team.
        </p>
      </div>
    </div>
  );
};

export default PackageDetails;
