'use client'
import React from 'react'
import LoginPage from './LoginPage'
import PremiumLoading from '../PremiulLoading'
import { useEffect, useState } from 'react';

function page() {
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {

      setIsLoading(false); // Set loading to false after components are "loaded"

  }, []);

  if(isLoading) {
    return <PremiumLoading/>
  }

  return (
  <div className='pt-20'>
  <LoginPage/>
  </div>
  )
}

export default page
