"use client"; // Ensuring this is a client component

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Importing usePathname for route detection

const TourPlanPage = () => {
  const pathname = usePathname(); // Current path detection

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <Image
          src="/andaman.png" // Replace with your hero background image path
          alt="Landscape"
          layout="fill"
          objectFit="cover"
          className="brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <p className="text-lg uppercase tracking-wider">Explore</p>
          <h1 className="text-6xl font-extrabold">Landscapes</h1>
        </div>

        {/* Transparent Navigation Tabs */}
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

      {/* Main Content */}
      <div className="max-w-6xl mx-auto mt-20 flex space-x-8">
        {/* Left Section: Tour Plan */}
        <div className="w-2/3 bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Tour Plan</h2>

          {/* Day Plans */}
          {[
            {
              day: 1,
              title: 'Arrival in Srinagar',
              description:
                'Start your tour adventure by arriving in Srinagar. The summer capital of Jammu & Kashmir offers you a beautiful Shikara ride on Dal Lake and an evening tour of Nishat Garden.',
              activities: ['Welcome drink on arrival', 'Dinner', 'Accommodation'],
            },
            {
              day: 2,
              title: 'Explore Gulmarg',
              description:
                'Begin your day exploring Gulmarg, a hill station famous for its picturesque meadows. Enjoy cable car rides on the Gondola and skiing during the winter season.',
              activities: ['Skiing experience', 'Breakfast'],
            },
            {
              day: 3,
              title: 'Discover Pahalgam',
              description:
                'Explore Pahalgam, known for its valleys and streams. Enjoy a guided tour through Betaab Valley and immerse yourself in the natural beauty.',
              activities: ['Sightseeing tour', 'Lunch', 'Accommodation'],
            },
            {
              day: 4,
              title: 'Historical Tour of Srinagar',
              description:
                'A guided historical tour of Srinagar, visiting the iconic Jamia Masjid and Shankaracharya Temple. Explore local markets in the evening.',
              activities: ['Breakfast', 'Tour guide'],
            },
            {
              day: 5,
              title: 'Return',
              description:
                'Conclude your journey with a peaceful morning on Dal Lake before your return to the airport.',
              activities: ['Breakfast', 'Transfers'],
            },
          ].map((plan) => (
            <div key={plan.day} className="flex items-start space-x-4 mb-6">
              <div className="bg-pink-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
                {plan.day}
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  Day {plan.day}: {plan.title}
                </h3>
                <p className="text-gray-600 mt-1">{plan.description}</p>
                <ul className="list-disc list-inside mt-2 text-sm text-gray-500">
                  {plan.activities.map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Right Section: Book This Tour */}
        <div className="w-1/3 bg-white p-8 shadow-lg rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Book This Tour</h3>
          <p className="text-sm text-gray-500 mb-6">
            Choose the tour package that best suits your needs. Let us make your travel arrangements seamless.
          </p>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="email"
              placeholder="Confirm Email"
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="number"
              placeholder="Number of Tickets"
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

export default TourPlanPage;
