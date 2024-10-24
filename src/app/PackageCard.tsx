import React from 'react';
import Image from 'next/image';
import { FaMapMarkerAlt, FaUsers, FaStar } from 'react-icons/fa';

const PackageCard = () => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-md overflow-hidden">
      {/* Image Section */}
      <div className="relative h-64">
        <Image
          src="https://via.placeholder.com/1500x500" // Add your image path here
          alt="Shimla"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">3 Days</span>
          <span className="flex items-center text-sm text-gray-600">
            <FaUsers className="mr-1" /> 155 People Going
          </span>
        </div>

        <h2 className="mt-2 text-2xl font-bold text-gray-800">Shimla</h2>
        <div className="flex items-center text-gray-500 text-sm">
          <FaMapMarkerAlt className="mr-1" /> Himachal Pradesh
        </div>

        {/* Rating */}
        <div className="mt-2 flex items-center">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <FaStar key={index} className="text-yellow-400" />
            ))}
        </div>

        {/* Pricing Section */}
        <div className="mt-3">
          <span className="text-lg font-bold text-red-500">Rs. 6,000</span>
          <span className="ml-2 text-sm text-gray-400 line-through">Rs. 9,999</span>
        </div>

        {/* Description */}
        <p className="mt-2 text-gray-600 text-sm">
          Majestic Shimla: The Queen of the Hills
          Discover the charm of Shimla, Himachal Pradesh, nestled in the heart of
          the Himalayas. Stroll along the scenic Mall Road, take in panoramic
          views from the Ridge, and explore the historic Christ Church.
        </p>

        {/* Explore Button */}
        <div className="mt-4">
          <button className="px-4 py-2 bg-orange-500 text-white font-bold rounded-md">
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
