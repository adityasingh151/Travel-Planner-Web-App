// Mark this component as a Client Component
'use client';

import { useState, useEffect, useCallback } from "react";
import axios from "axios";  // No need to import AxiosError
import Link from "next/link";

// Define the type for the response from the verification API
interface VerifyEmailResponse {
  email: string;
}

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");

  // Use useCallback to memoize the verifyUserEmail function to avoid unnecessary re-renders
  const verifyUserEmail = useCallback(async () => {
    try {
      const response = await axios.post<VerifyEmailResponse>("/api/users/verifyemail", { token });
      setEmail(response.data.email);
      setError(false);
      setVerified(true);
    } catch (err: unknown) {  // Correct type for the error as `unknown`
      setError(true);
      if (axios.isAxiosError(err)) {  // Type guard for AxiosError
        console.error(err.response?.data || err.message);
      } else {
        console.error("An unexpected error occurred:", err);
      }
    }
  }, [token]); // Only rerun if `token` changes

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      setError(false);
      verifyUserEmail();
    } else {
      setError(true);
    }
  }, [token, verifyUserEmail]); // Adding verifyUserEmail as a dependency

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full text-center">
        <h2 className="text-2xl font-bold text-pink-600 mb-4">Verify Your Email</h2>
        <h3 className="text-gray-700 mb-4 w-full">{email.length > 0 ? `Email: ${email}` : "No token"}</h3>

        {verified && (
          <div className="mb-4">
            <h3 className="text-lg text-green-600">Email Verified Successfully!</h3>
            <Link href="/login">
              <button className="mt-4 bg-pink-500 text-white py-2 px-6 rounded hover:bg-pink-600 transition duration-200">
                Login
              </button>
            </Link>
          </div>
        )}

        {error && (
          <div className="mb-4">
            <h3 className="text-lg bg-red-500 text-white p-2 rounded">Error verifying email. Please try again.</h3>
          </div>
        )}
      </div>
    </div>
  );
}
