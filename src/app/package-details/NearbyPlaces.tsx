import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as filledStar,
  faStarHalfAlt,
  faStar as emptyStar,
  faArrowLeft,
  faArrowRight,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import useWindowDimensions from "@/helpers/useWindowDimensions";

type ChosenItem = {
  title: string;
  type: string;
  details: any;
};

const NearbyPlaces: React.FC<{
  destinationCity: string;
  onChooseItem: (item: { title: string; type: string; details: any }) => void;
  chosenItems: ChosenItem[];
}> = ({ destinationCity, onChooseItem, chosenItems }) => {
  const [places, setPlaces] = useState<any[]>([]);
  const [selectedPlaces, setSelectedPlaces] = useState<any[]>([]); // Selected places for itinerary
  const [currentIndex, setCurrentIndex] = useState(0);
  const apiKey = process.env.NEXT_PUBLIC_GOMAPS_API_KEY as string;
  const { width } = useWindowDimensions();
  let itemsPerPage = 4;

  if (width < 1024) itemsPerPage = 3;
  if (width < 768) itemsPerPage = 2;
  if (width < 640) itemsPerPage = 1;

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center mt-1">
        {Array.from({ length: fullStars }).map((_, index) => (
          <FontAwesomeIcon
            key={`full-${index}`}
            icon={filledStar}
            className="text-yellow-500"
          />
        ))}
        {hasHalfStar && (
          <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-500" />
        )}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <FontAwesomeIcon
            key={`empty-${index}`}
            icon={emptyStar}
            className="text-gray-300"
          />
        ))}
      </div>
    );
  };

  useEffect(() => {
    const fetchNearbyPlaces = async () => {
      try {
        const textSearchResponse = await fetch(
          `${process.env.NEXT_PUBLIC_GOMAPS_DOMAIN}/textsearch/json?query=${destinationCity}&key=${apiKey}`
        );
        const textSearchData = await textSearchResponse.json();
        console.log("destination: ", destinationCity,"apikey: ",apiKey, "textSearchData: ", textSearchData)

        if (textSearchData.results && textSearchData.results.length > 0) {
          const { lat, lng } = textSearchData.results[0].geometry.location;

          const nearbySearchResponse = await fetch(
            `${process.env.NEXT_PUBLIC_GOMAPS_DOMAIN}/nearbysearch/json?location=${lat},${lng}&radius=500000&type=tourist_attraction&keyword=monument&key=${apiKey}`
          );
          const nearbySearchData = await nearbySearchResponse.json();
          console.log("nearbysearchData: ", nearbySearchData);

          const placesWithPhotos = nearbySearchData.results.map(
            (place: any) => ({
              ...place,
              photoUrl: place.photos?.[0]?.photo_reference
                ? `${process.env.NEXT_PUBLIC_GOMAPS_DOMAIN}/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${apiKey}`
                : "/placeholder-image.png",
            })
          );

          setPlaces(placesWithPhotos);
        }
      } catch (error) {
        console.error("Error fetching nearby places:", error);
      }
    };

    if (destinationCity) {
      fetchNearbyPlaces();
    }
  }, [destinationCity, apiKey]);

  const handleNext = () => {
    if (currentIndex + itemsPerPage < places.length) {
      setCurrentIndex((prevIndex) => prevIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex((prevIndex) => prevIndex - itemsPerPage);
    }
  };

  const handleAddToItinerary = (place: any) => {
    setSelectedPlaces((prevSelected) => [...prevSelected, place]);
  };

  const handleRemoveFromItinerary = (placeId: string) => {
    setSelectedPlaces((prevSelected) =>
      prevSelected.filter((place) => place.place_id !== placeId)
    );
  };

  const isPlaceInItinerary = (placeId: string) => {
    return selectedPlaces.some((place) => place.place_id === placeId);
  };

  const isChosen = (placeName: string) =>
    chosenItems.some(
      (item) => item.title === placeName && item.type === "place"
    );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mt-4 flex-1">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white text-center">
        Places to Visit
      </h2>

      <div className="flex items-center justify-between mt-4">
        {/* Navigation buttons */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="text-gray-500 dark:text-gray-400 disabled:opacity-50"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        <div className="overflow-hidden w-full">
          <ul
            className="flex transition-transform"
            style={{
              transform: `translateX(-${
                Math.floor(currentIndex / itemsPerPage) * 100
              }%)`,
              transition: "transform 0.3s ease-in-out",
            }}
          >
            {places.map((place, index) => (
              <li
                key={index}
                className={`border dark:border-gray-700 rounded-lg shadow-md overflow-hidden flex-shrink-0 mx-2 ${
                  itemsPerPage === 1
                    ? "min-w-full"
                    : `min-w-[calc(100%/${itemsPerPage})]`
                }`}
              >
                <img
                  src={place.photoUrl}
                  alt={place.name}
                  className="w-full h-48 object-cover"
                  onError={(e) =>
                    (e.currentTarget.src = "/placeholder-image.png")
                  }
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {place.name.length > 30 ? `${place.name.slice(0,30)}...` : place.name }
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {place.vicinity.length > 50 ? `${place.vicinity.slice(0,50)}...` : place.vicinity}
                  </p>
                  <div className="flex items-center mt-2">
                    {renderStars(place.rating)}
                    <span className="ml-2 text-gray-500 dark:text-gray-400 text-sm">
                      ({place.user_ratings_total || 0} reviews)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <a 
                    href={`https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${place.place_id}`}
                    className="mt-2 p-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
                    target="_blank"
                    >
                      Get Direction
                    </a>
                    {/* Add/Remove Button */}
                    <button
                      onClick={() =>
                        onChooseItem({
                          title: place.name,
                          type: "place",
                          details: {
                            name: place.name,
                            url: place.photoUrl,
                            vicinity: place.vicinity,
                            rating: place.rating,
                            user_ratings_total: place.user_ratings_total,
                          },
                        })
                      }
                      className={`mt-2 p-2 rounded-lg transition ${
                        isChosen(place.name)
                          ? "bg-red-500 hover:bg-red-600"
                          : "bg-green-500 hover:bg-green-600"
                      } text-white`}
                    >
                      {isChosen(place.name) ? "Remove" : "Add"}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={handleNext}
          disabled={currentIndex + itemsPerPage >= places.length}
          className="text-gray-500 dark:text-gray-400 disabled:opacity-50"
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default NearbyPlaces;
