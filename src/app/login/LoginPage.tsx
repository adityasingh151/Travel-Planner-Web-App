// components/LoginPage.tsx

import React from 'react';
import Image from 'next/image';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-lg">
        
        {/* Left Section with Image */}
        <div className="relative w-1/2 h-[600px]">
          <Image
            src="/loginsignupleftimage.png" // Replace with your actual image path
            alt="Scenic View"
            layout="fill"
            objectFit="cover"
            className="rounded-tl-lg rounded-bl-lg"
          />
        </div>

        {/* Right Section with Login Form */}
        <div className="w-1/2 bg-white p-16 relative">
          
          {/* Airplane SVG Flying Above Welcome */}
          <div className="absolute -top-20 left-10 z-10">
            <img
              src="/airplane.svg" // Replace with your airplane SVG path
              alt="Airplane"
              className="w-24 h-auto rotate-45"
            />
          </div>

          {/* Welcome Text */}
          <div className="-mt-8">
            <h2 className="text-5xl font-extrabold text-pink-600 mb-2">Welcome</h2>
            <p className="text-gray-500 text-lg">Login with Email</p>
          </div>

          {/* Login Form */}
          <form className="space-y-8 mt-8">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm text-gray-700">
                Enter Email or Username
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter Email or Username"
                className="w-full border border-pink-300 rounded-md p-3 focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm text-gray-700">
                Enter Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                className="w-full border border-pink-300 rounded-md p-3 focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div className="flex justify-between items-center">
              <a href="#" className="text-sm text-pink-600 hover:underline">
                Forgot your password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-3 rounded-md hover:bg-pink-600"
            >
              LOGIN
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center justify-center mt-8">
            <div className="border-t w-full border-gray-300"></div>
            <p className="px-4 text-sm text-gray-500">OR</p>
            <div className="border-t w-full border-gray-300"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex justify-center space-x-6 mt-6">
            <button className="p-3 border rounded-full">
              <img src="/googlelogo.svg" alt="Google" className="w-8 h-8" />
            </button>
            <button className="p-3 border rounded-full">
              <img src="/facebooklogo.svg" alt="Facebook" className="w-8 h-8" />
            </button>
            <button className="p-3 border rounded-full">
              <img src="/applelogo.svg" alt="Apple" className="w-8 h-8" />
            </button>
          </div>

          {/* Register Link */}
          <div className="mt-8 text-center mb-10">
            <p className="text-sm text-gray-500">
              Don’t have an account?{' '}
              <a href="/signup" className="text-pink-600 hover:underline">
                Register Now
              </a>
            </p>
          </div>

          {/* City Landmarks (SVGs at Bottom) */}
          <div className="absolute bottom-0 left-0 flex space-x-6 ml-8 mb-4">
            <img src="/tajmahal.svg" alt="Taj Mahal" className="w-20 h-auto" />
            <img src="/pisatower.svg" alt="Pisa Tower" className="w-20 h-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
