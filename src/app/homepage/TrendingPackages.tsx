import React from 'react';

const TrendingPackages: React.FC = () => {
  return (
    <div className="bg-white py-10">
      {/* Explore Nature and Cities Section */}
      <div className="flex flex-col md:flex-row justify-center items-center mb-12">
        <div className="relative w-full md:w-1/2 h-64">
          <img
            src="/explore-nature.png"
            alt="Explore Nature"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            {/* <h2 className="text-3xl text-white font-bold">Explore Nature</h2> */}
          </div>
        </div>
        <div className="relative w-full md:w-1/2 h-64">
          <img
            src="/explore-cities.png"
            alt="Explore Cities"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            {/* <h2 className="text-3xl text-white font-bold">Explore Cities</h2> */}
          </div>
        </div>
      </div>

      {/* Trending Tour Packages Section */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900">Our Trending Tour Packages</h2>
        <p className="text-red-500 text-xl font-semibold mt-2">TRENDY</p>
      </div>

      {/* Tour Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-12">
        {/* Package 1 */}
        <div className="border rounded-lg shadow-lg p-6">
          <img
            src="/jaipur.png"
            alt="Jaipur"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="text-lg font-bold">Jaipur</h3>
              <p className="text-gray-500">Rajasthan</p>
            </div>
            <p className="text-sm text-gray-500">8 Days</p>
          </div>
          <div className="text-sm text-gray-500 mb-2">25 People Going</div>
          <div className="flex items-center mb-4">
            <span className="text-yellow-500 text-lg mr-2">★★★★★</span>
            <p className="text-sm text-gray-500">5/5</p>
          </div>
          <p className="text-red-500 font-bold text-2xl">Rs. 5,000</p>
          <p className="text-gray-400 line-through">Rs. 10,999</p>
          <p className="text-gray-700 mt-2 mb-4">
            Enchanting Jaipur: A Royal Journey Immerse yourself in the vibrant colors and rich heritage of Rajasthan’s capital. Explore palaces, forts, and local bazaars.
          </p>
          <button className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300">
            Explore Now
          </button>
        </div>

        {/* Package 2 */}
        <div className="border rounded-lg shadow-lg p-6">
          <img
            src="/wayanad.png"
            alt="Wayanad"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="text-lg font-bold">Wayanad</h3>
              <p className="text-gray-500">Kerala</p>
            </div>
            <p className="text-sm text-gray-500">4 Days</p>
          </div>
          <div className="text-sm text-gray-500 mb-2">30 People Going</div>
          <div className="flex items-center mb-4">
            <span className="text-yellow-500 text-lg mr-2">★★★★★</span>
            <p className="text-sm text-gray-500">5/5</p>
          </div>
          <p className="text-red-500 font-bold text-2xl">Rs. 10,000</p>
          <p className="text-gray-400 line-through">Rs. 19,999</p>
          <p className="text-gray-700 mt-2 mb-4">
            Serene Wayanad: A Nature Lover’s Paradise Explore the lush landscapes of Wayanad, Kerala, and trek through waterfalls and tea plantations.
          </p>
          <button className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300">
            Explore Now
          </button>
        </div>

        {/* Package 3 */}
        <div className="border rounded-lg shadow-lg p-6">
          <img
            src="/shimla.png"
            alt="Shimla"
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="text-lg font-bold">Shimla</h3>
              <p className="text-gray-500">Himachal Pradesh</p>
            </div>
            <p className="text-sm text-gray-500">3 Days</p>
          </div>
          <div className="text-sm text-gray-500 mb-2">150 People Going</div>
          <div className="flex items-center mb-4">
            <span className="text-yellow-500 text-lg mr-2">★★★★★</span>
            <p className="text-sm text-gray-500">5/5</p>
          </div>
          <p className="text-red-500 font-bold text-2xl">Rs. 6,000</p>
          <p className="text-gray-400 line-through">Rs. 9,999</p>
          <p className="text-gray-700 mt-2 mb-4">
            Majestic Shimla: The Queen of the Hills Discover the charm of Shimla’s snow-capped mountains, colonial architecture, and scenic beauty.
          </p>
          <button className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300">
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendingPackages;
