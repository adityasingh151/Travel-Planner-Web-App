// components/SignupPage.tsx

import React from 'react';
import Image from 'next/image';

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white overflow-hidden">
      <div className="flex w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-lg relative">
        
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

        {/* Right Section with Signup Form */}
        <div className="w-1/2 bg-white p-16 relative">
          
          {/* Airplane SVG Above "Create an Account" */}
          <div className="absolute -top-12 right-0">
            <img
              src="/svgs/airplane.svg" // Replace with the actual airplane SVG path
              alt="Airplane"
              className="w-28 h-auto rotate-45"
            />
          </div>

          {/* Signup Heading */}
          <div className="-mt-8">
            <h2 className="text-4xl font-extrabold text-pink-600 mb-2">CREATE AN ACCOUNT</h2>
            <p className="text-gray-500 text-sm mb-8">
              By creating an account, you agree to our 
              <a href="#" className="text-pink-600 hover:underline mx-1">Privacy policy</a>
              and
              <a href="#" className="text-pink-600 hover:underline ml-1">Terms of use.</a>
            </p>
          </div>

          {/* Signup Form */}
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="border border-pink-300 rounded-md p-3 focus:ring-2 focus:ring-pink-500 w-full"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border border-pink-300 rounded-md p-3 focus:ring-2 focus:ring-pink-500 w-full"
              />
            </div>

            <input
              type="email"
              placeholder="Enter Email"
              className="w-full border border-pink-300 rounded-md p-3 focus:ring-2 focus:ring-pink-500"
            />

            <input
              type="password"
              placeholder="Enter Password"
              className="w-full border border-pink-300 rounded-md p-3 focus:ring-2 focus:ring-pink-500"
            />

            <input
              type="tel"
              placeholder="Mobile Number"
              className="w-full border border-pink-300 rounded-md p-3 focus:ring-2 focus:ring-pink-500"
            />

            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-3 rounded-md hover:bg-pink-600"
            >
              CREATE ACCOUNT
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center justify-center mt-8">
            <div className="border-t w-full border-gray-300"></div>
            <p className="px-4 text-sm text-gray-500">OR</p>
            <div className="border-t w-full border-gray-300"></div>
          </div>

          {/* Social Signup Buttons */}
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

          {/* Already have an account? */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <a href="#" className="text-pink-600 hover:underline">Login</a>
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

export default SignupPage;
