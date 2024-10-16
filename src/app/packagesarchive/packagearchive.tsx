// components/PackageArchive.tsx

import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // Import the Link component

const PackageArchive = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Hero Section with Background Image */}
      <div className="relative h-[500px] mb-24">
        <Image
          src="/packages-archive-hero-background.png"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center"></div>
      </div>

      {/* Input and Button Section Overlapping Hero */}
      <div className="absolute inset-x-0 -mt-28 flex items-center justify-center z-10 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
        <input
          type="date"
          className="border rounded-md p-2 mr-4 bg-transparent"
          aria-label="Select Date"
          title="Select Date"
        />
        <button className="bg-gray-300 text-black rounded-md p-2 mx-2 bg-transparent">
          Price Low To High
        </button>
        <button className="bg-gray-300 text-black rounded-md p-2 mx-2 bg-transparent">
          Price High To Low
        </button>
        <button className="bg-gray-300 text-black rounded-md p-2 mx-2 bg-transparent">
          Name (A-Z)
        </button>
      </div>

      {/* Main Content Area */}
      <div className="relative flex flex-col md:flex-row mt-32 gap-6">
        {/* Tour Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array(3).fill(null).map((_, index) => (
            <Link key={index} href="/tourinfo" passHref>
              <div className="bg-white rounded-lg shadow-md p-4 text-center cursor-pointer hover:shadow-xl transition-shadow">
                <Image
                  src="/Kashmir.jpg"
                  alt="Kashmir Tour"
                  width={300}
                  height={200}
                  className="rounded-t-lg"
                />
                <div className="mt-4">
                  <h2 className="text-lg font-semibold">Kashmir</h2>
                  <p className="text-gray-600">Rs. 20,000</p>
                  <p className="text-gray-600">5 Days 4 Nights</p>
                  <p className="text-sm text-gray-500 mt-2">Date: 15 September 2024</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Plan Your Trip Section */}
        <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg relative">
          <h2 className="text-xl font-semibold mb-4">Plan Your Trip</h2>

          <label htmlFor="search-tour" className="block mb-2 text-sm text-gray-700">
            Search Tour
          </label>
          <input
            id="search-tour"
            type="text"
            placeholder="Search Tour"
            className="border rounded-md p-2 mb-4 w-full"
          />

          <label htmlFor="where-to" className="block mb-2 text-sm text-gray-700">
            Where To?
          </label>
          <input
            id="where-to"
            type="text"
            placeholder="Where To?"
            className="border rounded-md p-2 mb-4 w-full"
          />

          <label htmlFor="trip-date" className="block mb-2 text-sm text-gray-700">
            Trip Date
          </label>
          <input
            id="trip-date"
            type="date"
            className="border rounded-md p-2 mb-4 w-full"
          />

          <label htmlFor="price-range" className="block mb-2 text-sm text-gray-700">
            Filter by Price
          </label>
          <div className="flex items-center mb-4">
            <input
              id="price-range"
              type="range"
              min="12"
              max="1200"
              className="w-full"
            />
            <span className="ml-4 text-sm text-gray-600">Price: $12 - $1200</span>
          </div>

          <button className="bg-red-500 text-white w-full py-2 rounded-md mt-4">
            Book Now
          </button>

          <div className="absolute bottom-0 right-0 transform translate-x-10 translate-y-10">
            <img src="/bag-airplane.svg" alt="Bag and Plane" className="w-24 h-auto" />
          </div>
        </div>
      </div>

      {/* Pagination Section */}
      <footer className="flex justify-center mt-10">
        <span className="px-2 cursor-pointer">1</span>
        <span className="px-2 cursor-pointer">2</span>
        <span className="px-2 cursor-pointer">3</span>
        <span className="px-2 cursor-pointer">4</span>
      </footer>

      <div className="absolute top-0 right-0 transform translate-x-20 -translate-y-10">
        <img src="/seashell.svg" alt="Seashell" className="w-12 h-auto" />
      </div>
    </div>
  );
};

export default PackageArchive;
