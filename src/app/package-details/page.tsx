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
  const [chosenItems, setChosenItems] = useState<any[]>([]);

  // Function to handle item selection
  const handleChooseItem = (item: {
    title: string;
    type: string;
    details: Train;
  }) => {
    // console.log("item: ",item)
    setChosenItems((prev) => {
      // console.log("Already prev: ",prev)
      const sameItemExists = prev.find(
        (i) => i.title === item.title && i.type === item.type
      );
      const otherTrainExists = prev.find((i) => i.type === item.type);

      if (sameItemExists) {
        // console.log("sameItemEXists")
        // If the same item exists, remove it to deselect
        return prev.filter((i) => i !== sameItemExists);
      } else if (otherTrainExists) {
        // console.log("otherTrainExists")
        // If another train exists, replace it with the new item
        return [...prev.filter((i) => i !== otherTrainExists), item];
      } else {
        // console.log("nosameitemexist")
        // Add the new item if it doesn't already exist
        return [...prev, item];
      }
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
            <NearbyPlaces destinationCity={destination} />
            <Hotels destinationCity={destination} checkInDate={startDate ?? ""} checkOutDate={endDate ?? ""} guests={guests ?? 2} />
            <Flights origin={origin} destination={destination} departureDate={startDate ?? ""} arrivalDate={endDate ?? ""} />
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
