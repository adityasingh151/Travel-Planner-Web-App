import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as filledStar, faStarHalfAlt, faStar as emptyStar, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import useWindowDimensions from "@/helpers/useWindowDimensions"; // Helper to detect screen width

const NearbyPlaces: React.FC<{ destinationCity: string }> = ({ destinationCity }) => {
  const [places, setPlaces] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const apiKey = process.env.NEXT_PUBLIC_GOMAPS_API_KEY as string;
  const { width } = useWindowDimensions(); // Use custom hook to get window width
  let itemsPerPage = 4; // Default

  // Responsiveness: Adjust number of items based on screen width
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
          <FontAwesomeIcon key={`full-${index}`} icon={filledStar} className="text-yellow-500" />
        ))}
        {hasHalfStar && (
          <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-500" />
        )}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <FontAwesomeIcon key={`empty-${index}`} icon={emptyStar} className="text-gray-300" />
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

        if (textSearchData.results && textSearchData.results.length > 0) {
          const { lat, lng } = textSearchData.results[0].geometry.location;

          const nearbySearchResponse = await fetch(
            `${process.env.NEXT_PUBLIC_GOMAPS_DOMAIN}/nearbysearch/json?location=${lat},${lng}&radius=500000&type=tourist_attraction&keyword=monument&key=${apiKey}`
          );
          const nearbySearchData = await nearbySearchResponse.json();

          const placesWithPhotos = nearbySearchData.results.map((place: any) => ({
            ...place,
            photoUrl: place.photos?.[0]?.photo_reference
              ? `${process.env.NEXT_PUBLIC_GOMAPS_DOMAIN}/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${apiKey}`
              : "/placeholder-image.png",
          }));

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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mt-4 flex-1">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white text-center">Places to Visit</h2>
      
      <div className="flex items-center justify-between mt-4">
        <button onClick={handlePrev} disabled={currentIndex === 0} className="text-gray-500 dark:text-gray-400 disabled:opacity-50">
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        
        <div className="overflow-hidden w-full">
          <ul
            className="flex transition-transform"
            style={{
              transform: `translateX(-${Math.floor(currentIndex / itemsPerPage) * 100}%)`,
              transition: 'transform 0.3s ease-in-out',
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
                  onError={(e) => (e.currentTarget.src = "/placeholder-image.png")}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{place.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{place.vicinity}</p>
                  <div className="flex items-center mt-2">
                    {renderStars(place.rating)}
                    <span className="ml-2 text-gray-500 dark:text-gray-400 text-sm">({place.user_ratings_total || 0} reviews)</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button onClick={handleNext} disabled={currentIndex + itemsPerPage >= places.length} className="text-gray-500 dark:text-gray-400 disabled:opacity-50">
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default NearbyPlaces;
