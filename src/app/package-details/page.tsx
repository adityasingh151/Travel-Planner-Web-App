'use client'
import { useSearchParams } from "next/navigation";
import Image from 'next/image';
import NearbyPlaces from "./NearbyPlaces";
import Hotels from "./Hotels";
import Trains from "./Trains";
import Flights from "./Flights";

const PackageDetails: React.FC = () => {
  const searchParams = useSearchParams();

  const originRegion = searchParams.get("originRegion");
  const destinationCity = searchParams.get("destinationCity");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const guests = Number(searchParams.get("guests"))

  const origin = originRegion ?? "";
  const destination = destinationCity ?? "";

  return (
    <div className="w-full p-0">

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 mt-20 text-center">Travel Package Details</h1>

        {destination && (
          <div >
            {/* <NearbyPlaces destinationCity={destination} />
            <Hotels destinationCity={destination} checkInDate={startDate ?? ""} checkOutDate={endDate ?? ""} guests={guests ?? 2} /> */}
            <Trains origin={origin} destination={destination} departureDate={startDate ?? ""} arrivalDate={endDate ?? ""} />
            {/* <Flights origin={origin} destination={destination} departureDate={startDate ?? ""} arrivalDate={endDate ?? ""} /> */}
          </div>
        )}
      </div>

      {/* Additional Information Section (Optional) */}
      <div className="mt-8 bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">More Information</h2>
        <p className="text-gray-700">For more details about your travel package, please contact our support team.</p>
      </div>
    </div>
  );
};

export default PackageDetails;
