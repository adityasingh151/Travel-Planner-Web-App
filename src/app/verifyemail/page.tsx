"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [email, setemail] = useState("")

  const verifyUserEmail = async () => {
    try {
      const user = await axios.post("/api/users/verifyemail", { token });
    //   console.log(user.data.email)
    setemail(user.data.email)
      setError(false);
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.error(error.response.data);
    }
  };

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
  }, [token]);

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

        {/* <p className="text-gray-500 text-sm mt-6">
          Need help? <Link href="/support" className="text-pink-600 hover:underline">Contact Support</Link>
        </p> */}
      </div>
    </div>
  );
}
