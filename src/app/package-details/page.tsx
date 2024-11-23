"use client";
import { useSearchParams } from "next/navigation";
import NearbyPlaces from "./NearbyPlaces";
import Hotels from "./Hotels";
import Trains from "./Trains";
import Flights from "./Flights";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/AuthContext";
import PremiumLoading from "../PremiulLoading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  details: any;
};

const PackageDetails: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams();
  const originRegion = searchParams.get("originRegion");
  const destinationCity = searchParams.get("destinationCity");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const guests = Number(searchParams.get("guests"));
  const origin = originRegion ?? "";
  const destination = destinationCity ?? "";

   // Initial travel details object
   const travelDetails = {
    originRegion,
    destinationCity,
    startDate,
    endDate,
    guests
  };

  const [chosenItems, setChosenItems] = useState<ChosenItem[]>([
    {
      title: "Travel Details",
      type: "travelInfo",
      details: travelDetails,
    },
  ]);
 


  // const [chosenItems, setChosenItems] = useState<ChosenItem[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const { setChosenItems: updateContextChosenItems } = useAuth(); // Import from context


  useEffect(() => {
    // Simulate loading data (e.g., API call or initial setup)
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after components are "loaded"
    }, 1000); // Adjust this timeout as necessary to match your loading time

    return () => clearTimeout(timer); // Clean up the timeout if the component is unmounted
  }, []);

  const handleChooseItem = (item: {
    title: string;
    type: string;
    details: any;
  }) => {
    setChosenItems((prev) => {
      const isPlaceType = item.type === "place";
      const sameItemExists = prev.some(
        (i) => i.title === item.title && i.type === item.type
      );

      if (sameItemExists) {
        return prev.filter(
          (i) => !(i.title === item.title && i.type === item.type)
        );
      } else {
        if (isPlaceType) {
          return [...prev, item];
        } else {
          return [...prev.filter((i) => i.type !== item.type), item];
        }
      }
    });
  };

  const handleItinerary = () => {
    // Check if at least one item with type="place" exists
    const hasPlace = chosenItems.some(item => item.type === "place");

    if (!hasPlace) {
      // Show toast message if no "place" item exists
      console.log("No palce is selected.")
      toast.error("Please select at least one place.");
    } else {
      // Update context and navigate to itinerary page
      console.log(chosenItems)
      updateContextChosenItems(chosenItems); // Save to context
      router.push("/tourinfo/tourplan");
    }
  };

  if (isLoading) {
    return <PremiumLoading />; // Show loading spinner until data is loaded
  }

  return (
    <div className="w-full p-4 sm:p-6 md:p-8 bg-white dark:bg-gray-900">
       <ToastContainer position="top-center" autoClose={3000} />
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 mt-8 text-center">
          Travel Package Details
        </h1>

        {destination && (
          <div className="space-y-4 md:space-y-6">
            <Trains
              origin={origin}
              destination={destination}
              departureDate={startDate ?? ""}
              arrivalDate={endDate ?? ""}
              onChooseItem={handleChooseItem}
              chosenItems={chosenItems}
            />
            <NearbyPlaces
              destinationCity={destination}
              onChooseItem={handleChooseItem}
              chosenItems={chosenItems}
            />
            <Hotels
              destinationCity={destination}
              checkInDate={startDate ?? ""}
              checkOutDate={endDate ?? ""}
              guests={guests ?? 2}
              onChooseItem={handleChooseItem}
              chosenItems={chosenItems}
            />
            <Flights
              origin={origin}
              destination={destination}
              departureDate={startDate ?? ""}
              arrivalDate={endDate ?? ""}
              onChooseItem={handleChooseItem}
              chosenItems={chosenItems}
            />
          </div>
        )}
      </div>

      <div className="flex justify-center mt-6 relative">
        <button
          className={`p-4 px-8 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold text-lg rounded-xl shadow-lg ${
            chosenItems.length === 0
              ? "opacity-50 cursor-not-allowed"
              : "transition-transform duration-300 transform hover:scale-105"
          }`}
          disabled={chosenItems.length === 0}
          onClick={handleItinerary}
        >
          Generate AI Travel Blueprint
          {chosenItems.length > 0 && (
            <span className="absolute -top-2 -right-2 transform bg-red-600 dark:bg-yellow-500 text-white text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center">
              {chosenItems.length}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default PackageDetails;
