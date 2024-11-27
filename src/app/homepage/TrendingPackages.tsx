'use client';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as filledStar, faStarHalfAlt, faStar as emptyStar } from '@fortawesome/free-solid-svg-icons';

interface Attraction {
  name: string;
  vicinity: string;
  rating: number;
  user_ratings_total: number;
  photo_reference: string;
  photoUrl?: string;
}

const TrendingPackages: React.FC = () => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [displayedAttractions, setDisplayedAttractions] = useState<Attraction[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOMAPS_API_KEY as string;

  // Memoize default attractions to prevent re-creating on each render
  const defaultAttractions: Attraction[] = useMemo(() => [
    {
      name: 'India Gate',
      vicinity: 'Kartavya Path, New Delhi',
      rating: 4.6,
      user_ratings_total: 274377,
      photo_reference: 'AdCG2DOsZ9TUe4PqEW_OgecykdRurUGcqKmBg5NGcP7S4U0i4lNXwhQ4BNsyln_d5IsKEJOk5e3xc0XRVWWzNrmXQdmiUxGoz4T5JQIQzXOohX383kX-Hi_azGfJDmjfkwRV89vCcBabUwql6EoU6cXgO3krNy3qzxXCW1xvSFfUCPiVmN_a',
    },
    // Add more default attractions as needed...
  ], []);  // Empty dependency array ensures it's only created once

  // Helper function to render stars based on rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {Array.from({ length: fullStars }).map((_, index) => (
          <FontAwesomeIcon key={`full-${index}`} icon={filledStar} className="text-yellow-500" />
        ))}
        {hasHalfStar && <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-500" />}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <FontAwesomeIcon key={`empty-${index}`} icon={emptyStar} className="text-gray-300" />
        ))}
      </div>
    );
  };

  // Function to get the photo URL from a photo reference
  const getPhotoUrl = useCallback(
    (photoReference: string) => {
      return `https://maps.gomaps.pro/maps/api/place/photo?photo_reference=${photoReference}&maxwidth=400&key=${apiKey}`;
    },
    [apiKey]
  );

  useEffect(() => {
    const fetchAttractions = async (latitude: number, longitude: number) => {
      try {
        const response = await axios.get(
          `https://maps.gomaps.pro/maps/api/place/nearbysearch/json`,
          {
            params: {
              location: `${latitude},${longitude}`,
              radius: 500000,
              type: 'tourist_attraction',
              keyword: 'monument',
              key: apiKey,
            },
          }
        );

        const attractionsData = response.data.results || [];

        // Add photo URLs for each attraction
        const attractionsWithPhotos = attractionsData.map((attraction: Attraction) => ({
          ...attraction,
          photoUrl: attraction.photo_reference
            ? getPhotoUrl(attraction.photo_reference)
            : '/placeholder-image.png',
        }));

        setAttractions(attractionsWithPhotos);
        setDisplayedAttractions(attractionsWithPhotos.slice(0, 6));
      } catch (err) {
        console.error('Error fetching attractions:', err);
        setError('Unable to fetch attractions.');
        const defaultWithPhotos = defaultAttractions.map((place) => ({
          ...place,
          photoUrl: getPhotoUrl(place.photo_reference),
        }));
        setAttractions(defaultWithPhotos);
        setDisplayedAttractions(defaultWithPhotos.slice(0, 6));
      } finally {
        setLoading(false);
      }
    };

    const requestUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchAttractions(latitude, longitude);
          },
          () => {
            console.warn('Location permission denied. Showing default attractions.');
            const defaultWithPhotos = defaultAttractions.map((place) => ({
              ...place,
              photoUrl: getPhotoUrl(place.photo_reference),
            }));
            setAttractions(defaultWithPhotos);
            setDisplayedAttractions(defaultWithPhotos.slice(0, 6));
            setLoading(false);
          }
        );
      } else {
        console.warn('Geolocation is not supported by this browser.');
        const defaultWithPhotos = defaultAttractions.map((place) => ({
          ...place,
          photoUrl: getPhotoUrl(place.photo_reference),
        }));
        setAttractions(defaultWithPhotos);
        setDisplayedAttractions(defaultWithPhotos.slice(0, 6));
        setLoading(false);
      }
    };

    requestUserLocation();
  }, [defaultAttractions, getPhotoUrl, apiKey]);  // Default attractions and other dependencies

  const handleShowMore = () => {
    setShowAll(true);
    setDisplayedAttractions(attractions);
  };

  return (
    <div className="bg-white py-10">
      {loading ? (
        <div className="text-center text-gray-500">Loading attractions...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <div>
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900">Places Near You</h2>
            <p className="text-red-500 text-xl font-semibold mt-2">TRENDY</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-12">
            {displayedAttractions.map((attraction, index) => (
              <div key={index} className="border rounded-lg shadow-lg p-6">
                <Image
                  src={attraction.photoUrl || '/placeholder-image.png'}
                  alt={attraction.name}
                  width={400}
                  height={192}
                  className="rounded-md mb-4"
                />
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-black">{attraction.name}</h3>
                    <p className="text-gray-500">{attraction.vicinity}</p>
                    {renderStars(attraction.rating)}
                  </div>
                  <p className="text-sm text-gray-500">({attraction.user_ratings_total} reviews)</p>
                </div>
                <button className="px-4 py-2 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition duration-300">
                  Explore Now
                </button>
              </div>
            ))}
          </div>
          {!showAll && attractions.length > 6 && (
            <div className="text-center mt-6">
              <button
                onClick={handleShowMore}
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Show More
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrendingPackages;
