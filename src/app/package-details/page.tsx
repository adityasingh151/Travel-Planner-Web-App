"use client";
import { useSearchParams } from "next/navigation";
import NearbyPlaces from "./NearbyPlaces";
import Hotels from "./Hotels";
import Flights from "./Flights";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/AuthContext";
import PremiumLoading from "../PremiulLoading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Flight extends Record<string, unknown> {
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

interface Place extends Record<string, unknown> {
  name: string;
  vicinity: string;
  rating: number;
  user_ratings_total: number;
  photoUrl: string;
}

interface Hotel extends Record<string, unknown> {
  name: string;
  description: string;
  rate_per_night: number;
  overall_rating: number;
  reviews: number;
}

interface TravelDetails extends Record<string, unknown> {
  originRegion: string | null;
  destinationCity: string | null;
  startDate: string | null;
  endDate: string | null;
  guests: number;
}

type ChosenItem = {
  title: string;
  type: "flight" | "hotel" | "place" | "travelInfo";
  details: Flight | Place | Hotel | TravelDetails;
};


const PackageDetails: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const originRegion = searchParams.get("originRegion");
  const destinationCity = searchParams.get("destinationCity");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const guests = Number(searchParams.get("guests"));
  const origin = originRegion ?? "";
  const destination = destinationCity ?? "";

  const travelDetails: TravelDetails = {
    originRegion,
    destinationCity,
    startDate,
    endDate,
    guests,
  };

  const [chosenItems, setChosenItems] = useState<ChosenItem[]>([
    {
      title: "Travel Details",
      type: "travelInfo",
      details: travelDetails,
    },
  ]);

  const [isLoading, setIsLoading] = useState(true);
  const { setChosenItems: updateContextChosenItems } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleChooseItem = (item: ChosenItem) => {
    setChosenItems((prev) => {
<<<<<<< Updated upstream
      const isTransportType = item.type === "flight" || item.type === "train";
=======
      const isTransportType = item.type === "flight";
>>>>>>> Stashed changes
      const sameItemExists = prev.some(
        (i) => i.title === item.title && i.type === item.type
      );
  
      if (sameItemExists) {
        // Remove the item if it already exists
        return prev.filter(
          (i) => !(i.title === item.title && i.type === item.type)
        );
      } else {
        if (isTransportType) {
<<<<<<< Updated upstream
          // Remove any existing 'flight' or 'train' and add the new item
          return [...prev.filter((i) => i.type !== "flight" && i.type !== "train"), item];
        } else {
          // For other types, retain existing items and add the new one
=======
          return [
            ...prev.filter((i) => i.type !== "flight"),
            item,
          ];
        } else {
>>>>>>> Stashed changes
          return [...prev, item];
        }
      }
    });
  };
  

  const handleItinerary = () => {
    const hasPlace = chosenItems.some((item) => item.type === "place");

    if (!hasPlace) {
      toast.error("Please select at least one place.");
    } else {
      updateContextChosenItems(chosenItems);
      router.push("/tourinfo/tourplan");
    }
  };

  if (isLoading) {
    return <PremiumLoading />;
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
