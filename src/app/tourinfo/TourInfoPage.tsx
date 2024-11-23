"use client"; // Ensuring this is a client-side component

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/AuthContext";
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai"; 
import ReactMarkdown, { Components } from "react-markdown";
import BookThisTour from "./BookThisTour";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Custom markdown components to style Gemini's API response
const markdownComponents: Partial<Components> = {
  h1: ({ ...props }) => <h1 className="text-3xl font-bold text-pink-500 mb-4" {...props} />,
  h2: ({ ...props }) => <h2 className="text-2xl font-semibold text-pink-500 mb-3" {...props} />,
  p: ({ ...props }) => <p className="text-darkBlue mb-2 leading-relaxed" {...props} />,
  ul: ({ ...props }) => <ul className="list-inside text-darkBlue mb-4 list-none" {...props} />,
  li: ({ ...props }) => <li className="mb-1" {...props} />,
  strong: ({ ...props }) => <strong className="font-semibold text-pink-700" {...props} />,
  em: ({ ...props }) => <em className="italic text-pink-600" {...props} />,
};

const TourInfoPage = () => {
  const pathname = usePathname();
  const { chosenItems } = useAuth();
  const [destinationInfo, setDestinationInfo] = useState<string>("No information available.");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const destinationCity = chosenItems[0]?.details.destinationCity || "";

  const fetchDestinationDetails = async () => {
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
  };

  useEffect(() => {
    if (destinationCity) fetchDestinationDetails();
  }, [destinationCity]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <Image src="/andaman.png" alt="Landscape" layout="fill" objectFit="cover" className="brightness-75" />
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

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto mt-20 flex space-x-8">
        {/* Left Section: Destination Information */}
        <div className="w-2/3 bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-3xl font-semibold mb-4 text-darkBlue">Destination Information</h2>

          {/* Show Loading or Destination Info */}
          {isLoading ? (
            <div className="text-center text-lg text-gray-500">Loading destination details...</div>
          ) : (
            <ReactMarkdown className="prose prose-pink text-black" components={markdownComponents}>
              {destinationInfo}
            </ReactMarkdown>
          )}
        </div>

        {/* Right Section: Book This Tour */}
        <BookThisTour/>
      </div>

      {/* Footer with Bag and Plane SVG */}
      <div className="flex justify-end max-w-6xl mx-auto mt-10">
        <img src="/bag-airplane.svg" alt="Bag and Plane" className="w-40 h-auto" />
      </div>
    </div>
  );
};

export default TourInfoPage;
