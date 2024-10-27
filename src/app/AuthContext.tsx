"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import axios from "axios";

// Define a type for your Auth context
interface AuthContextType {
  username: string;
  email:string;
  profilePicture:string;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Create the Auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [profilePicture, setprofilePicture] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { data: session, status } = useSession();

  // Effect to check login status when the component mounts
  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session && session.user) {
        setUsername(session.user.name || ""); // Store the user's name
        setemail(session.user.email || "");
        setprofilePicture(session.user.image || "");
        setIsLoggedIn(true);
        
      } else {
        setIsLoggedIn(false);
      }
    };

    checkSession();
  }, [session]);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      console.log("email & password:  ", email, password)
      // Optionally, use `signIn` from next-auth for third-party providers or credentials
      const response = await signIn("credentials", { email, password, redirect: false });
      console.log("response: ",response)
      if (response?.ok) {
        const session = await getSession();
        setUsername(session?.user?.name || ""); // Update username from session
        setIsLoggedIn(true);
      } else {
        throw new Error(response?.error || "Login failed");
      }
    } catch (error) {
      console.error("Login Failed:", error);
      throw new Error("Login failed");
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await signOut({ redirect: false }); // Use next-auth's `signOut`
      setUsername("");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ username, isLoggedIn, login, logout, email, profilePicture }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
