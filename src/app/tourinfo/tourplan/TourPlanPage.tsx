"use client"; // Ensuring this is a client component

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/AuthContext';
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai"; 
import ReactMarkdown, { Components } from 'react-markdown';
import BookThisTour from '../BookThisTour';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const markdownComponents: Partial<Components> = {
  h1: ({ ...props }) => <h1 className="text-3xl font-bold text-pink-500 mb-4" {...props} />,
  h2: ({ ...props }) => <h2 className="text-2xl font-semibold text-pink-500 mb-3" {...props} />,
  p: ({ ...props }) => <p className="text-darkBlue mb-2 leading-relaxed" {...props} />,
  ul: ({ ...props }) => <ul className="list-inside text-darkBlue mb-4 list-none" {...props} />,
  li: ({ ...props }) => <li className="mb-1" {...props} />,
  strong: ({ ...props }) => <strong className="font-semibold text-pink-700" {...props} />,
  em: ({ ...props }) => <em className="italic text-pink-600" {...props} />,
  // inlineCode: ({ children }) => {
  //   return <code className="text-darkBlue bg-gray-200 p-1 rounded">{children}</code>;
  // },
  
  text: ({ children, ...props }) => {
    if (typeof children === 'string') {
      if (children.includes("##")) return <h3 className="text-xl font-semibold text-pink-500 mb-2">{children}</h3>;
      if (children.includes("*")) return <ul className="list-disc list-inside text-pink-600">{children}</ul>;
    }
    return <span {...props}>{children}</span>;
  }
};


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
  const pathname = usePathname();
  const [itineraryResponse, setItineraryResponse] = useState("nothing is present.");
  const { chosenItems } = useAuth();
  console.log("chosenItems: ", chosenItems)

  // Adjusting type of chosenItemsObject to avoid implicit 'any' error
  const chosenItemsObject = chosenItems.reduce<Record<number, ChosenItem>>((acc, curr, index) => {
    acc[index] = curr;
    return acc;
  }, {});
  
  const travelInfoText = JSON.stringify(Object.values(chosenItemsObject), null, 2);

  const fetchItinerary = async () => {
    try {
      const payload = `Provide a detailed travel itinerary focusing on tourist attraction for below origin, destination, with below number of people, for below time period, for below details about train, places I want to visit and flights I want to take as below${travelInfoText}`;
      const result = await model.generateContent(payload);
      const itinerary = result.response?.text || "No itinerary available.";
      setItineraryResponse(itinerary);
    } catch (error) {
      console.error("Error fetching itinerary:", error);
      setItineraryResponse("Failed to load itinerary.");
    }
  };

  useEffect(() => {
    if (chosenItems.length > 0) {
      fetchItinerary();
    }
  }, [chosenItems]);


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

      {/* Main Content */}
      <div className="max-w-6xl mx-auto mt-20 flex space-x-8">
        <div className="w-2/3 bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-6 text-darkBlue">Tour Plan</h2>
          {itineraryResponse && itineraryResponse !== "nothing is present." ? (
            <ReactMarkdown className="prose prose-pink text-black" components={markdownComponents}>
              {itineraryResponse}
            </ReactMarkdown>
          ) : (
            <p className="text-gray-600">No itinerary available. Please select your preferences to view the itinerary.</p>
          )}
        </div>

        {/* Right Section: Book This Tour */}
        <BookThisTour/>
      </div>
    </div>
  );
};

export default TourPlanPage;
