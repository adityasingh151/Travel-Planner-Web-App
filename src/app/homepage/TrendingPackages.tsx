'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as filledStar, faStarHalfAlt, faStar as emptyStar } from '@fortawesome/free-solid-svg-icons';

const TrendingPackages: React.FC = () => {
  const [attractions, setAttractions] = useState<any[]>([]);
  const [displayedAttractions, setDisplayedAttractions] = useState<any[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API key (replace {{gomapsapi}} with your actual key)
  const apiKey = process.env.NEXT_PUBLIC_GOMAPS_API_KEY as string;

  // Default locations for Delhi
  const defaultAttractions = [
    {
      name: 'India Gate',
      vicinity: 'Kartavya Path, New Delhi',
      rating: 4.6,
      user_ratings_total: 274377,
      photo_reference: 'AdCG2DOsZ9TUe4PqEW_OgecykdRurUGcqKmBg5NGcP7S4U0i4lNXwhQ4BNsyln_d5IsKEJOk5e3xc0XRVWWzNrmXQdmiUxGoz4T5JQIQzXOohX383kX-Hi_azGfJDmjfkwRV89vCcBabUwql6EoU6cXgO3krNy3qzxXCW1xvSFfUCPiVmN_a',
      photoUrl: '', // Will be set later using photoReference
    },
    {
      name: 'Jantar Mantar',
      vicinity: 'J6G8+RMC, Connaught Place, Sansad Marg, New Delhi',
      rating: 4.2,
      user_ratings_total: 32153,
      photo_reference: 'AdCG2DPDVo-AQacS5pVO3hmIzIcpxo7vQz_ECMx0W55LZ5s-HL8BnyNmFxN4S4qJh36Ozg38ktpY6hEWXLhX0V1gvZRn_dM7q-FpwhIHvnfdgZMGcpcs99_PXB7NWOWBZHhcwCQtaPXZ5t3zdgqG9CGizQleGB2WaLvVWz87P1xl-ypNXXUy',
      photoUrl: '', // Will be set later using photoReference
    },
    {
      name: 'Safdarjung Tomb',
      vicinity: 'Airforce Golf Course, Delhi Race Club, New Delhi',
      rating: 4.4,
      user_ratings_total: 14598,
      photo_reference: 'AdCG2DMH7QCZVK28zZPtkPQ9XgiVqNpWmXM-13zmDAG6kOr8DVMKF_grJf8XAluPE4Rkn4c8whspJzR-GPHL70AioVBAsslrYh6dAg4P5URxhTes64goCUJQF0rICB6-YcUEWk7uOFCXmmTwyDbaNGMXGHqhvq-3QFUvxeSAi4YlTybB1Kar',
      photoUrl: '', // Will be set later using photoReference
    },
    {
      name: 'Neela Gumbad',
      vicinity: 'H7R3+Q7C, Nizamuddin, Nizamuddin East, New Delhi',
      rating: 4.2,
      user_ratings_total: 202,
      photo_reference: 'AdCG2DPdDj0K7z_7AOVtB7H0evpZM5P2hLjjyfTbTo4p6PuXvrD2YgefpfDa7hN1gLtX_hkebfjgFL-UITsYofCC00_oA0Tu4_XArKYqi1xpHjCf_ZqO5tuh_28WlozCVFoJOR8N5GuT0i-p5scE-4J8GmDzyiMoklPDo80KjEFufmsp5n-b',
      photoUrl: '', // Will be set later using photoReference
    },
    {
      name: 'Lal Bangla Monument',
      vicinity: 'J62Q+47Q, Dr Zakir Hussain Marg, Delhi Golf Club, Golf Links, New Delhi',
      rating: 4,
      user_ratings_total: 67,
      photo_reference: 'AdCG2DMJ6h9xw9iD_KbomjAr2Mi0nsGswcfS8krvi0CNT0q220qDkeKYojRMpUnRaIkvRZPMVPVTDVy6wjYs97oB_spLZ-1TCtVgSumC9epxPHbJw8yr-V3KioboVR_qogv8ABT7n4YRPC_e6yuw8CRXUd6rMH4trqRAi7w7X-CAci4hXTXq',
      photoUrl: '', // Will be set later using photoReference
    },
    {
      name: 'Telegraph Memorial (near British Magazine)',
      vicinity: `'28°39'43. 77°14'04., 4, 4th West, Myton`,
      rating: 4.2,
      user_ratings_total: 13,
      photo_reference: 'AdCG2DNsxumQsImLAALvR1Jv1jt-Ur_SjyLoJkYL5lGfDuALXPclM4TrGULmDLU7NzmJE8UlI-hhwKKlQFswAQBl6OfYSJq3eDo0TwxFu1gfpGBapS7wLWrVhq2_X25wwurI-7cqDQht1BJ9Efd_47likq_UXnnLdLSFVa01m3wugdW5bvVm',
      photoUrl: '', // Will be set later using photoReference
    },
    // Add 4 more default locations here as needed with their respective photo references...
  ];

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
        {hasHalfStar && (
          <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-500" />
        )}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <FontAwesomeIcon key={`empty-${index}`} icon={emptyStar} className="text-gray-300" />
        ))}
      </div>
    );
  };

  // Function to get the photo URL from a photo reference
  const getPhotoUrl = (photoReference: string) => {
    return `https://maps.gomaps.pro/maps/api/place/photo?photo_reference=${photoReference}&maxwidth=400&key=${apiKey}`;
  };

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
        const attractionsWithPhotos = attractionsData.map((attraction: any) => ({
          ...attraction,
          photoUrl: attraction.photos?.[0]?.photo_reference
            ? getPhotoUrl(attraction.photos[0].photo_reference)
            : '/placeholder-image.png',
        }));

        setAttractions(attractionsWithPhotos);
        setDisplayedAttractions(attractionsWithPhotos.slice(0, 6));
      } catch (error) {
        console.error('Error fetching attractions:', error);
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
  }, [apiKey]);

  // Function to handle "Show More" click
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
                <img
                  src={attraction.photoUrl || '/placeholder-image.png'}
                  alt={attraction.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                  onError={(e) => (e.currentTarget.src = '/placeholder-image.png')}
                />
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-black">{attraction.name}</h3>
                    <p className="text-gray-500">{attraction.vicinity}</p>
                    {renderStars(attraction.rating)}
                  </div>
                  <p className="text-sm text-gray-500">
                    ({attraction.user_ratings_total} reviews)
                  </p>
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
