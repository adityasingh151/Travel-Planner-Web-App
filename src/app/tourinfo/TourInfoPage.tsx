"use client"; // Ensure it's a client-side component

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Correct import
import { useAuth } from "@/app/AuthContext"; // Access context for chosen items
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai"; 
import ReactMarkdown from "react-markdown";

// Initialize the Generative AI client and model
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const TourInfoPage = () => {
  const pathname = usePathname(); // Using usePathname() to get the current path
  const { chosenItems } = useAuth(); // Access queryParams from context
  const [destinationInfo, setDestinationInfo] = useState<string>(""); // State to store Gemini API response
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state

  // Debugging log to check queryParams
  // console.log("QueryParams in info: ", queryParams);

  // Extract destination city from queryParams
  const destinationCity = chosenItems[0]?.details.destinationCity || "";

  // Function to fetch tourist details for the city using Gemini API
  const fetchDestinationDetails = async () => {
    if (!destinationCity) {
      console.log("No destination city found.");
      return;
    }

    setIsLoading(true);

    // Create a refined request payload asking for tourist-related information
    const payload = `Provide key information about the city: ${destinationCity}. Include a description of the city, popular attractions, best time to visit, and any unique cultural aspects. Keep it concise but informative.`;
    
    // Debugging log to check the payload being sent
    console.log("Sending payload to Gemini API:", payload);

    try {
      // Generate content using Gemini API
      const result = await model.generateContent(payload);
      
      // Debugging log to check the result received
      console.log("Gemini API response:", result);

      if (result.response?.text) {
        const info = result.response.text;
        setDestinationInfo(info);
      } else {
        console.log("No response text returned from Gemini.");
        setDestinationInfo("No detailed information available.");
      }
    } catch (error) {
      console.error("Error fetching destination details:", error);
      setDestinationInfo("Failed to load destination details.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (destinationCity) {
      fetchDestinationDetails(); // Fetch destination details when destinationCity changes
    } else {
      console.log("No destination city specified in queryParams.");
    }
  }, [destinationCity]);

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

        {/* Transparent Navigation Tabs */}
        <div className="absolute inset-x-0 bottom-0 mx-auto flex items-center justify-center bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg max-w-4xl p-4">
          <Link
            href="/tourinfo"
            className={`px-4 py-2 mx-2 font-semibold rounded-md ${
              pathname === "/tourinfo/information"
                ? "bg-pink-500 text-white"
                : "text-gray-600 hover:text-pink-600"
            }`}
          >
            Information
          </Link>

          <Link
            href="/tourinfo/tourplan"
            className={`px-4 py-2 mx-2 font-semibold rounded-md ${
              pathname === "/tourinfo/tour-plan"
                ? "bg-pink-500 text-white"
                : "text-gray-600 hover:text-pink-600"
            }`}
          >
            Tour Plan
          </Link>

          <Link
            href="/tourinfo/tourlocation"
            className={`px-4 py-2 mx-2 font-semibold rounded-md ${
              pathname === "/tourinfo/location"
                ? "bg-pink-500 text-white"
                : "text-gray-600 hover:text-pink-600"
            }`}
          >
            Location
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto mt-20 flex space-x-8">
        {/* Left Section: Destination Information */}
        <div className="w-2/3 bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-3xl font-semibold mb-4">Destination Information</h2>

          {/* Show Loading or Destination Info */}
          {isLoading ? (
            <div className="text-center text-lg text-gray-500">Loading destination details...</div>
          ) : (
            <div className="prose prose-pink text-black">
              <ReactMarkdown>{destinationInfo}</ReactMarkdown>
            </div>
          )}
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
