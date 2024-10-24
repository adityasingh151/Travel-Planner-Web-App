"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Toaster } from "react-hot-toast";
import { signIn } from "next-auth/react"; // Import signIn from next-auth

const SignupPage = () => {
  const router = useRouter();
  const [user, setuser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobileNo: "",
  });

  const [buttonDisabled, setbuttonDisabled] = useState(true);
  const [loading, setloading] = useState(false);

  const onSignup = async () => {
    try {
      setloading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("SignUp Successful", response.data);
      setloading(false);
      toast.success(
        "Registration successful, please verify your mail within an hour!"
      );
    } catch (error: any) {
      console.error("SignUp Failed", error);
      toast.error(`SignUp Failed, Please try again!`);
      setloading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setloading(true);
    const result = await signIn("google", { callbackUrl: '/' });
  console.log(result)
    if (result?.error) {
      console.error("Google Sign-In Error:", result.error);
      toast.error("Google Sign-In Failed, Please try again!");
    } else {
      // Optionally handle success if needed
      toast.success("Google Sign-In successful!");
    }
  
    setloading(false);
  };
  

  useEffect(() => {
    if (
      user.firstName.length > 0 &&
      user.lastName.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 5 &&
      user.mobileNo.length > 0
    ) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white overflow-hidden">
      <div className="flex w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-lg relative">
        <Toaster />
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
            <h2 className="text-4xl font-extrabold text-pink-600 mb-2">
              CREATE AN ACCOUNT
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              By creating an account, you agree to our
              <a href="#" className="text-pink-600 hover:underline mx-1">
                Privacy policy
              </a>
              and
              <a href="#" className="text-pink-600 hover:underline ml-1">
                Terms of use.
              </a>
            </p>
          </div>

          {/* Signup Form */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                onChange={(e) =>
                  setuser({ ...user, firstName: e.target.value })
                }
                className="input input-bordered w-full bg-gray-200 text-black border-gray-700 focus:outline-none focus:border-pink-500"
              />

              <input
                type="text"
                placeholder="Last Name"
                onChange={(e) =>
                  setuser({ ...user, lastName: e.target.value })
                }
                className="input input-bordered w-full bg-gray-200 text-black border-gray-700 focus:outline-none focus:border-pink-500"
              />
            </div>

            <input
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setuser({ ...user, email: e.target.value })}
              className="input input-bordered w-full bg-gray-200 text-black border-gray-700 focus:outline-none focus:border-pink-500"
            />

            <div>
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setuser({ ...user, password: e.target.value })}
                className="input input-bordered w-full bg-gray-200 text-black border-gray-700 focus:outline-none focus:border-pink-500"
              />
              {user.password.length > 0 && user.password.length < 6 && (
                <div className="my-0 py-0">
                  <p className="text-red-500 italic text-sm">Password must be at least 6 characters long</p>
                </div>
              )}
            </div>

            <input
              type="tel"
              placeholder="Mobile Number"
              onChange={(e) => setuser({ ...user, mobileNo: e.target.value })}
              className="input input-bordered w-full bg-gray-200 text-black border-gray-700 focus:outline-none focus:border-pink-500"
            />

            <button
              onClick={onSignup}
              disabled={buttonDisabled || loading}
              className={`w-full bg-pink-500 text-white py-3 rounded-md flex justify-center items-center ${
                buttonDisabled || loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-pink-600"
              }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              ) : buttonDisabled ? (
                "No Sign Up"
              ) : (
                "Create Account"
              )}
            </button>
          </div>

          {/* OR Divider */}
          <div className="flex items-center justify-center mt-8">
            <div className="border-t w-full border-gray-300"></div>
            <p className="px-4 text-sm text-gray-500">OR</p>
            <div className="border-t w-full border-gray-300"></div>
          </div>

          {/* Social Signup Buttons */}
          <div className="flex justify-center space-x-6 mt-6">
            <button
              onClick={handleGoogleSignIn}
              className="p-3 border rounded-full"
            >
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
              Already have an account?{" "}
              <Link href="/login" className="text-pink-600 hover:underline">
                Login
              </Link>
            </p>
          </div>

          {/* City Landmarks (SVGs at Bottom) */}
          <div className="absolute bottom-0 left-0 flex space-x-6 ml-8 mb-4">
            <img src="/tajmahal.svg" alt="Taj Mahal" className="w-20 h-auto" />
            <img
              src="/pisatower.svg"
              alt="Pisa Tower"
              className="w-20 h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
