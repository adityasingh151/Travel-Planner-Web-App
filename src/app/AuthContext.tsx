'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Define a type for your Auth context
interface AuthContextType {
  username: string;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Create the Auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Effect to check login status when the component mounts
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post('/api/users/ifloggedin');
        if (response.data.success) {
          setUsername(response.data.firstName); // Store the firstName to display in the header
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        setIsLoggedIn(false);
      }
    };

    verifyToken();
  });

  // Login function
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('/api/users/login', { email, password });
      if (response.data.success) {
        setUsername(response.data.firstName); // Store username or any user identifier
        setIsLoggedIn(true);
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login Failed:', error);
      throw new Error('Login failed');
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      setUsername('');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Logout Failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ username, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
