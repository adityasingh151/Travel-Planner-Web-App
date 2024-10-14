"use client";

import React, { useState } from "react";

const BuildYourOwnPackage: React.FC = () => {
  const [destinationRegion, setDestinationRegion] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [activities, setActivities] = useState({
    culture: false,
    outdoors: false,
    romantic: false,
    religious: false,
    shopping: false,
    business: false,
    traditions: false,
    relaxing: false,
    hiking: false,
    museums: false,
    party: false,
    wildlife: false,
    fishing: false,
    cruise: false,
    healthcare: false,
    accommodation: false,
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setActivities({ ...activities, [name]: checked });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({
      destinationRegion,
      destinationCity,
      startDate,
      endDate,
      guests,
      activities,
    });
  };

  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: 'url("/Front picture.jpg")' }} // Adjust to your image
    >
      {/* Blurred background effect */}
      <div className="absolute inset-0 backdrop-blur-md bg-opacity-10"></div>

      {/* Form Container */}
      <div className="relative z-10 bg-white rounded-lg shadow-lg p-6 max-w-lg w-full text-center">
        <h1 className="text-xl font-bold text-gray-900 mb-4">
          Build Your Own Package
        </h1>

        <form className="space-y-3" onSubmit={handleSubmit}>
          {/* Destination Inputs */}
          <div>
            <label className="block text-left text-gray-700 text-sm font-medium mb-1">
              Enter destination (region or city)
            </label>
            <input
              type="text"
              placeholder="Lansdowne"
              value={destinationRegion}
              onChange={(e) => setDestinationRegion(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          <div>
            <label className="block text-left text-gray-700 text-sm font-medium mb-1">
              Enter destination (country, region, or city)
            </label>
            <input
              type="text"
              placeholder="Shri Tarkeshwar Dham Mandir"
              value={destinationCity}
              onChange={(e) => setDestinationCity(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>

          {/* Date Range Inputs */}
          <div className="flex space-x-3">
            <div className="w-1/2">
              <label
                htmlFor="start-date"
                className="block text-left text-gray-700 text-sm font-medium mb-1"
              >
                Start Date
              </label>
              <input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <div className="w-1/2">
              <label
                htmlFor="end-date"
                className="block text-left text-gray-700 text-sm font-medium mb-1"
              >
                End Date
              </label>
              <input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="guests"
              className="block text-left text-gray-700 text-sm font-medium mb-1"
            >
              Guests
            </label>
            <select
              id="guests"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="1">1 Adult</option>
              <option value="2">2 Adults</option>
              <option value="3">3 Adults</option>
              <option value="4">4 Adults</option>
            </select>
          </div>

          {/* Activities Preferences */}
          <div>
            <label className="block text-left text-gray-700 text-sm font-medium mb-1">
              Activities Preferences (optional)
            </label>
            <div className="grid grid-cols-4 gap-4">
              {Object.keys(activities).map((activity) => (
                <label key={activity} className="flex items-center">
                  <input
                    type="checkbox"
                    name={activity}
                    checked={activities[activity as keyof typeof activities]}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    {activity.charAt(0).toUpperCase() + activity.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600 transition"
          >
            Build Package
          </button>
        </form>
      </div>
    </section>
  );
};

export default BuildYourOwnPackage;
