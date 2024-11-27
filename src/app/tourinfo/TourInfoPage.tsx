"use client"; // Ensuring this is a client-side component

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/AuthContext";
import { GoogleGenerativeAI } from "@google/generative-ai"; 
import ReactMarkdown, { Components } from "react-markdown";
import BookThisTour from "./BookThisTour";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Custom markdown components to style Gemini's API response
const markdownComponents: Partial<Components> = {
  h1: ({ ...props }) => <h1 className="text-3xl font-bold text-pink-500 mb-4 dark:text-pink-300" {...props} />,
  h2: ({ ...props }) => <h2 className="text-2xl font-semibold text-pink-500 mb-3 dark:text-pink-300" {...props} />,
  p: ({ ...props }) => <p className="text-darkBlue mb-2 leading-relaxed dark:text-gray-300" {...props} />,
  ul: ({ ...props }) => <ul className="list-inside text-darkBlue mb-4 list-none dark:text-gray-300" {...props} />,
  li: ({ ...props }) => <li className="mb-1" {...props} />,
  strong: ({ ...props }) => <strong className="font-semibold text-pink-700 dark:text-pink-400" {...props} />,
  em: ({ ...props }) => <em className="italic text-pink-600 dark:text-pink-300" {...props} />,
};

const TourInfoPage = () => {
  const pathname = usePathname();
  const { chosenItems } = useAuth();
  const [destinationInfo, setDestinationInfo] = useState<string>("No information available.");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const destinationCity = chosenItems[0]?.details.destinationCity || "";

  // Memoizing fetchDestinationDetails to avoid unnecessary re-creations on each render
  const fetchDestinationDetails = useCallback(async () => {
    if (!destinationCity) return;

    setIsLoading(true);
    const payload = `Provide key information about the city: ${destinationCity}. Include a description of the city, popular attractions, best time to visit, and unique cultural aspects.`;

    try {
      const result = await model.generateContent(payload);
      setDestinationInfo(result.response?.text || "No detailed information available.");
    } catch (error) {
      console.error("Error fetching destination details:", error);
      setDestinationInfo("Failed to load destination details.");
    } finally {
      setIsLoading(false);
    }
  }, [destinationCity]);

  // Adding fetchDestinationDetails to the dependency array of useEffect
  useEffect(() => {
    if (destinationCity) fetchDestinationDetails();
  }, [destinationCity, fetchDestinationDetails]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <Image
          src="/andaman.png"
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
        <div className="absolute inset-x-0 bottom-0 mx-auto flex items-center justify-center bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg max-w-4xl p-4 dark:bg-gray-800 dark:bg-opacity-90">
          <Link
            href="/tourinfo"
            className={`px-4 py-2 mx-2 font-semibold rounded-md ${
              pathname === "/tourinfo/information"
                ? "bg-pink-500 text-white"
                : "text-gray-600 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-400"
            }`}
          >
            Information
          </Link>
          <Link
            href="/tourinfo/tourplan"
            className={`px-4 py-2 mx-2 font-semibold rounded-md ${
              pathname === "/tourinfo/tour-plan"
                ? "bg-pink-500 text-white"
                : "text-gray-600 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-400"
            }`}
          >
            Tour Plan
          </Link>
          <Link
            href="/tourinfo/tourlocation"
            className={`px-4 py-2 mx-2 font-semibold rounded-md ${
              pathname === "/tourinfo/location"
                ? "bg-pink-500 text-white"
                : "text-gray-600 hover:text-pink-600 dark:text-gray-300 dark:hover:text-pink-400"
            }`}
          >
            Location
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto mt-20 flex flex-col lg:flex-row lg:space-x-8">
        {/* Left Section: Destination Information */}
        <div className="w-full lg:w-2/3 bg-white p-8 shadow-lg rounded-lg dark:bg-gray-800">
          <h2 className="text-3xl font-semibold mb-4 text-darkBlue dark:text-white">Destination Information</h2>

          {/* Show Loading or Destination Info */}
          {isLoading ? (
            <div className="text-center text-lg text-gray-500 dark:text-gray-400">
              Loading destination details...
            </div>
          ) : (
            <ReactMarkdown
              className="prose prose-pink text-black dark:prose-invert"
              components={markdownComponents}
            >
              {destinationInfo}
            </ReactMarkdown>
          )}
        </div>

        {/* Right Section: Book This Tour */}
        <div className="w-full lg:w-1/3">
          <BookThisTour />
        </div>
      </div>

      {/* Footer with Bag and Plane SVG */}
      <div className="flex justify-end max-w-6xl mx-auto mt-10">
<<<<<<< Updated upstream
        <img
          src="/bag-airplane.svg"
          alt="Bag and Plane"
          className="w-40 h-auto dark:invert"
=======
        <Image
          src="/bag-airplane.svg"
          alt="Bag and Plane"
          width={160} // Added width and height for optimization
          height={40}
          className="dark:invert"
>>>>>>> Stashed changes
        />
      </div>
    </div>
  );
};

export default TourInfoPage;
