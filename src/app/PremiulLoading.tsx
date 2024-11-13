// PremiumLoading.tsx

"use client";
import React from "react";

const PremiumLoading = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen bg-white dark:bg-gray-800">
      <div className="flex flex-col items-center space-y-4">
        {/* Container for Spinner and Logo */}
        <div className="relative flex justify-center items-center">
          {/* Spinner */}
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-pink-500 dark:border-pink-300"></div>
          
          {/* Logo in the center of the spinner */}
          <img
            src="/lets-go-icon.png"
            alt="Website Logo"
            className="absolute h-16 w-16 object-contain mt-3"
            style={{ width: "90px" }}
          />
        </div>

        {/* Interesting Loading Text */}
        <p className="text-1xl md:text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mt-4">
          We're getting things ready... Hold tight! 🚀
        </p>
      </div>
    </div>
  );
};

export default PremiumLoading;
