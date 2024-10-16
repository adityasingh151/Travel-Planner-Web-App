"use client"; // Marking this as a client component

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Correct import

const TourInfoPage = () => {
  const pathname = usePathname(); // Using usePathname() to get the current path

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <Image
          src="/andaman.png" // Replace with your image path
          alt="Landscape"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <p className="text-lg uppercase tracking-wider">Explore</p>
          <h1 className="text-6xl font-extrabold">Landscapes</h1>
        </div>

        {/* Transparent Navigation Tabs Overlapping Hero */}
        <div className="absolute inset-x-0 bottom-0 mx-auto flex items-center justify-center bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg max-w-4xl p-4">
          <Link
            href="/tourinfo"
            className={`px-4 py-2 mx-2 font-semibold rounded-md ${
              pathname === '/tourinfo/information'
                ? 'bg-pink-500 text-white'
                : 'text-gray-600 hover:text-pink-600'
            }`}
          >
            Information
          </Link>

          <Link
            href="/tourinfo/tourplan"
            className={`px-4 py-2 mx-2 font-semibold rounded-md ${
              pathname === '/tourinfo/tour-plan'
                ? 'bg-pink-500 text-white'
                : 'text-gray-600 hover:text-pink-600'
            }`}
          >
            Tour Plan
          </Link>

          <Link
            href="/tourinfo/tourlocation"
            className={`px-4 py-2 mx-2 font-semibold rounded-md ${
              pathname === '/tourinfo/location'
                ? 'bg-pink-500 text-white'
                : 'text-gray-600 hover:text-pink-600'
            }`}
          >
            Location
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto mt-20 flex space-x-8">
        {/* Left Section */}
        <div className="w-2/3 bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-3xl font-semibold mb-4">Information</h2>
          <p className="text-gray-600">
            Welcome to Kashmir, a land where breathtaking beauty meets majestic mountains. Known for its 
            snow-capped peaks and beautiful valleys, it offers a truly immersive experience for travelers.
          </p>
        </div>

        {/* Right Section: Book This Tour */}
        <div className="w-1/3 bg-white p-8 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Book This Tour</h3>
          <p className="text-sm text-gray-500 mb-6">
            Choose the tour package that suits your needs. Let us handle the rest for a smooth journey.
          </p>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-pink-500"
            />
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-pink-500"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-3 rounded-md hover:bg-pink-600"
            >
              Check Availability
            </button>
            <button
              type="button"
              className="w-full bg-gray-100 text-pink-600 py-3 rounded-md mt-2 hover:bg-gray-200"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>

      {/* Footer with Bag and Plane SVG */}
      <div className="flex justify-end max-w-6xl mx-auto mt-10">
        <img src="/bag-airplane.svg" alt="Bag and Plane" className="w-40 h-auto" />
      </div>
    </div>
  );
};

export default TourInfoPage;
