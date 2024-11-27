'use client';

import React, { useEffect, useState } from 'react';
import LoginPage from './LoginPage';
import PremiumLoading from '../PremiulLoading';

function Login() { // Use a proper name for the component
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate loading completion
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Optional: Simulate a delay
  }, []);

  if (isLoading) {
    return <PremiumLoading />;
  }

  return (
    <div className="pt-20">
      <LoginPage />
    </div>
  );
}

export default Login;
