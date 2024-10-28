"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from 'next/image';
import { usePathname } from "next/navigation";
import { useAuth } from '@/app/AuthContext'; // Adjust the import path accordingly
import { signIn, getSession, useSession, signOut } from "next-auth/react";

const LoginPage = () => {
  const { login } = useAuth(); // Access the login function from context
  const router = useRouter();
  const pathname = usePathname()
  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setbuttonDisabled] = useState(true);
  const [loading, setloading] = useState(false);
  const { data: session } = useSession();
  console.log("session: ",session)

  const onLogin = async () => {
    try {
      setloading(true);
      // Call login function from context for manual login (email/password)
      const response = await login(user.email, user.password);
      console.log("response:",response)
      setloading(false);
      toast.success("Login Successful!");
  
      router.push("/"); // Redirect after successful login
    } catch (error: any) {
      console.log("Login Failed, Please try again!");
      setloading(false);
      toast.error(error.message);
    }
  };


  useEffect(() => {
    // Run this effect whenever the session changes
    console.log("outside session");
    if (session) {

      if (session && (pathname === '/login')) {
        // If the user is authenticated and tries to access signup, redirect them to the homepage
        router.push('/');
        return; // Prevent further execution
      }
      console.log("inside session");
  
      // Now, we have a session after the user has logged in with Google
      const checkUserExists = async () => {
        try {
          const userEmail = session.user?.email;
  
          if (!userEmail) {
            toast.error("Unable to retrieve user information.");
            // Log out the user if email is not available
            signOut();
            return;
          }
  
          // Check if the user exists in the database
          const userExistsResponse = await axios.post('/api/users/google-signin', { email: userEmail });
          // console.log("User Exists Response:", userExistsResponse.data);
  
          if (!userExistsResponse.data.exists) {
            toast.error("User does not exist. Please register first.");
            // Log out the user if they are not found in the database
            signOut();
            router.push("/signup");
            return;
          }
  
          // If user exists, log them in or redirect
          toast.success("Login Successful!");
          router.push("/");
        } catch (axiosError) {
          console.error("Error during user existence check:", axiosError);
          toast.error("Error checking user in database.");
          // Log out the user if there's an error during the check
          signOut();
        }
      };
  
      // Call the function to check user existence
      checkUserExists();
    }
  }, [session, router]);
  

  const handleLoginWithGoogle = async () => {
    try {
      toast.loading("Redirecting to Google for login...");
      // setLoading(true);
      await signIn("google", { redirect: true });
    } catch (error) {
      console.log("Google login failed", error);
      toast.error("Google login failed. Please try again.");
      // setLoading(false);
    }
  };

  
  
  
  
  

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 5) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-lg">
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

        {/* Right Section with Login Form */}
        <div className="w-1/2 bg-white p-16 relative">
          {/* Airplane SVG Flying Above Welcome */}
          <div className="absolute -top-20 left-10 z-10">
            <img
              src="/airplane.svg" // Replace with your airplane SVG path
              alt="Airplane"
              className="w-24 h-auto rotate-45"
            />
          </div>

          {/* Welcome Text */}
          <div className="-mt-8">
            <h2 className="text-5xl font-extrabold text-pink-600 mb-2">Welcome</h2>
            <p className="text-gray-500 text-lg">Login with Email</p>
          </div>

          {/* Login Form */}
          <div className="space-y-8 mt-8">
            <div>
              <input
                type="email"
                placeholder="Enter Email"
                onChange={(e) => setuser({ ...user, email: e.target.value })}
                className="input input-bordered w-full bg-gray-200 text-black border-gray-700 focus:outline-none focus:border-pink-500"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Enter Password"
                onChange={(e) => setuser({ ...user, password: e.target.value })}
                className="input input-bordered w-full bg-gray-200 text-black border-gray-700 focus:outline-none focus:border-pink-500"
              />
            </div>

            <div className="flex justify-between items-center">
              <a href="#" className="text-sm text-pink-600 hover:underline">
                Forgot your password?
              </a>
            </div>

            <button
              onClick={onLogin}
              disabled={buttonDisabled || loading} // Disable button if loading or disabled
              className={`w-full bg-pink-500 text-white py-3 rounded-md hover:bg-pink-600 ${buttonDisabled || loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading ? 'Logging in...' : 'LOGIN'}
            </button>
          </div>

          {/* OR Divider */}
          <div className="flex items-center justify-center mt-8">
            <div className="border-t w-full border-gray-300"></div>
            <p className="px-4 text-sm text-gray-500">OR</p>
            <div className="border-t w-full border-gray-300"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="flex justify-center space-x-6 mt-6">
            <button 
            onClick={handleLoginWithGoogle}
            className="p-3 border rounded-full">
              <img src="/googlelogo.svg" alt="Google" className="w-8 h-8" />
            </button>
            <button className="p-3 border rounded-full">
              <img src="/facebooklogo.svg" alt="Facebook" className="w-8 h-8" />
            </button>
            <button className="p-3 border rounded-full">
              <img src="/applelogo.svg" alt="Apple" className="w-8 h-8" />
            </button>
          </div>

          {/* Register Link */}
          <div className="mt-8 text-center mb-10">
            <p className="text-sm text-gray-500">
              Don’t have an account?{' '}
              <Link href="/signup" className="text-pink-600 hover:underline">
                Register Now
              </Link>
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

export default LoginPage;
