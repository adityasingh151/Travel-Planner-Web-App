import Link from "next/link";
import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <header className="w-full h-20 flex items-center justify-between px-8 bg-white shadow-md">
      {/* Left: Logo with Image */}
      <div className="flex items-center space-x-2">
        <Image src="/lets-go-icon.png" alt="Logo" width={80} height={80} /> {/* Image Icon */}
        {/* <span className="text-3xl font-bold text-pink-600">Let&apos;s Go</span> */}
      </div>

      {/* Center: Navigation Links */}
      <nav className="flex space-x-8 text-lg font-medium text-pink-600">
        <Link href="/" className="relative group">
          Home
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-pink-600 transition-all group-hover:w-full"></span>
        </Link>
        <Link href="/about" className="relative group">
          About
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-pink-600 transition-all group-hover:w-full"></span>
        </Link>
        <Link href="/services" className="relative group">
          Services
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-pink-600 transition-all group-hover:w-full"></span>
        </Link>
        <Link href="/packagesarchive" className="relative group">
          Upcoming Packages
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-pink-600 transition-all group-hover:w-full"></span>
        </Link>
      </nav>

      {/* Right: Get in Touch Button */}
      <div>
        <Link
          href="/login"
          className="px-6 py-2 bg-pink-500 text-white font-semibold rounded-md shadow-md hover:bg-pink-600 transition-all"
        >
          Login
        </Link>
      </div>
    </header>
  );
}
