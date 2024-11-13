
'use client'

import React, { useState, useEffect } from 'react';
import Hero from './Hero';
import Romantic from './Romantic';
import Testimonials from './Testimonials';
import TrendingPackages from './TrendingPackages';
import PremiumLoading from '../PremiulLoading';

function Page() {
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate loading data (e.g., API call or initial setup)
    const timer = setTimeout(() => {
      setIsLoading(false); // Set loading to false after components are "loaded"
    }, 30000); // Adjust this timeout as necessary to match your loading time

    return () => clearTimeout(timer); // Clean up the timeout if the component is unmounted
  }, []);

  return (
    <div className='w-full h-full'>
      {isLoading ? (
        <PremiumLoading /> // Show loading component while data is loading
      ) : (
        <div>
          <Hero />
          <Romantic />
          <Testimonials />
          <TrendingPackages />
        </div>
      )}
    </div>
  );
}

export default Page;
