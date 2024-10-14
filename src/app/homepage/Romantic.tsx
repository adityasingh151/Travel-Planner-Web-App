import React from 'react';

const Romantic: React.FC = () => {
  return (
    <div className="bg-white py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Section with Images */}
        <div className="relative flex justify-center items-center">
          {/* Main Image */}
          <div className="relative z-10">
            <img
              src="/couples.jpg"
              alt="Couple on the beach"
              className="rounded-lg shadow-md w-full object-cover"
            />
          </div>
          {/* Circular Image 1 */}
          <div className="absolute top-[-40px] left-[-40px] w-20 h-20">
            <img
              src="/couples_sunset.jpg"
              alt="Sunset Couple"
              className="rounded-full border-4 border-white shadow-md"
            />
          </div>
          {/* Circular Image 2 */}
          <div className="absolute bottom-[-30px] left-[-30px] w-20 h-20">
            <img
              src="/couples2.jpg"
              alt="Couple Hiking"
              className="rounded-full border-4 border-white shadow-md"
            />
          </div>
        </div>

        {/* Right Section with Text */}
        <div className="flex flex-col justify-center">
          <h2 className="text-lg font-semibold text-red-500 tracking-widest uppercase">
            Honeymoon Specials
          </h2>
          <h3 className="text-4xl font-bold text-gray-900 mt-2">
            Our Romantic Tropical Destinations
          </h3>
          <p className="text-lg text-gray-600 mt-4 mb-8">
            Craft the ideal itinerary for your dream honeymoon, personalized to create unforgettable romantic memories. Explore our romantic tropical destinations, designed specifically for your honeymoon. Enjoy a personalized itinerary that includes breathtaking beaches, luxurious resorts, and intimate experiences, all tailored to make your special getaway truly unforgettable.
          </p>
          <button className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300">
            View Packages
          </button>
        </div>
      </div>

      {/* Second Section */}
      <div className="mt-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Side */}
        <div className="flex flex-col justify-center">
          <h4 className="text-red-500 text-sm font-semibold uppercase mb-2">Fast & Easy</h4>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Get Your Favourite Resort Bookings</h2>

          {/* Icon list */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-orange-500 text-2xl mr-4">✓</span>
              <p className="text-lg text-gray-700">Choose Destination</p>
            </div>
            <div className="flex items-center">
              <span className="text-orange-500 text-2xl mr-4">✓</span>
              <p className="text-lg text-gray-700">Check Availability</p>
            </div>
            <div className="flex items-center">
              <span className="text-orange-500 text-2xl mr-4">✓</span>
              <p className="text-lg text-gray-700">Let’s Go</p>
            </div>
          </div>
        </div>

        {/* Right Side with Trip Details */}
        <div className="relative flex justify-center items-center">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full md:max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-lg">Trip to Mumbai</h4>
              <p className="text-sm text-gray-500">14 - 29 June</p>
            </div>
            <div className="relative mb-6">
              <img
                src="/mumbai-trip.png"
                alt="Mumbai trip"
                className="rounded-lg w-full h-40 object-cover"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                <span className="font-bold text-gray-800">60 people</span> are interested
              </div>
              <button className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300">
                Book Now
              </button>
            </div>
          </div>
          {/* Overlaying Plane Image */}
          <div className="absolute top-[-40px] right-[-30px]">
            <img src="/plane.svg" alt="Plane" className="w-32 h-32 object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Romantic;
