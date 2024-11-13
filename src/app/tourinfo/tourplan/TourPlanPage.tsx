"use client"; // Ensuring this is a client component

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/AuthContext';
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai"; 
import ReactMarkdown from 'react-markdown';

// Initialize the Generative AI client and model
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


type ChosenItem = {
  title: string;
  type: string;
  details: Train;
};
interface Stop {
  name: string;
  time: string;
}

interface Train {
  title: string;
  start_stop: Stop;
  end_stop: Stop;
  formatted_duration: string;
  stops: Stop[];
}
const TourPlanPage = () => {
  const pathname = usePathname(); // Current path detection

  // State to hold API response
  const [itineraryResponse, setItineraryResponse] = useState("");
  const {chosenItems} = useAuth()
  console.log("chosenItems: ", chosenItems)

  // Define the type for the accumulator object
type ChosenItemsObject = {
  [key: string]: ChosenItem;
};

// Convert chosen items to the desired structure and stringify
const chosenItemsObject = chosenItems.reduce((acc, curr, index) => {
  acc[index] = curr;
  return acc;
}, {});
const travelInfoText = JSON.stringify(Object.values(chosenItemsObject), null, 2);

// Function to generate itinerary content
const fetchItinerary = async () => {
  try {
    const payload = `Provide a travel itinerary for: ${travelInfoText}`;
    
    // Generate content using GenerativeModel API
    const result = await model.generateContent(payload);
    
    // Check response and update state
    const itinerary = result.response.text || "No itinerary available.";
    setItineraryResponse(itinerary);
  } catch (error) {
    console.error("Error fetching itinerary:", error);
    setItineraryResponse("Failed to load itinerary.");
  }
};

// Trigger fetchItinerary on chosenItems change
useEffect(() => {
  if (chosenItems.length > 0) {
    fetchItinerary();
  }
}, [chosenItems]);

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
          <Link href="/tourinfo" className={`px-4 py-2 mx-2 font-semibold rounded-md ${pathname === '/tourinfo/information' ? 'bg-pink-500 text-white' : 'text-gray-600 hover:text-pink-600'}`}>
            Information
          </Link>
          <Link href="/tourinfo/tourplan" className={`px-4 py-2 mx-2 font-semibold rounded-md ${pathname === '/tourinfo/tour-plan' ? 'bg-pink-500 text-white' : 'text-gray-600 hover:text-pink-600'}`}>
            Tour Plan
          </Link>
          <Link href="/tourinfo/tourlocation" className={`px-4 py-2 mx-2 font-semibold rounded-md ${pathname === '/tourinfo/location' ? 'bg-pink-500 text-white' : 'text-gray-600 hover:text-pink-600'}`}>
            Location
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto mt-20 flex space-x-8">
        {/* Left Section: Tour Plan */}
        <div className="w-2/3 bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Tour Plan</h2>

          {/* Render Markdown data */}
          <ReactMarkdown className="prose prose-pink text-black">
            {itineraryResponse}
          </ReactMarkdown>
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
