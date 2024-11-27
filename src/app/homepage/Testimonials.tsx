import React from 'react';
import Image from 'next/image';

const Testimonials: React.FC = () => {
  return (
    <div className="relative py-16 bg-gradient-to-b from-white via-[#E7F0F8] to-white">
      {/* Top-Left Background Stroke */}
      <div className="absolute top-0 left-0 bg-gradient-to-br from-[#E7F0F8] to-transparent w-48 h-48 rounded-full"></div>

      {/* Bottom-Right Background Stroke */}
      <div className="absolute bottom-0 right-0 bg-gradient-to-tl from-[#E7F0F8] to-transparent w-48 h-48 rounded-full"></div>

      {/* Top-left Image */}
      <div className="absolute top-10 left-8">
        <Image
          src="/seashell.png"
          alt="Top Left"
          width={160}
          height={160}
          className="rounded-lg shadow-md"
        />
      </div>

      {/* Bottom-left Image */}
      <div className="absolute bottom-10 left-10">
        <Image
          src="/bottom-left-svg.svg"
          alt="Bottom Left"
          width={160}
          height={160}
          className="rounded-lg shadow-md"
        />
      </div>

      {/* Top-right Image */}
      <div className="absolute top-10 right-10">
        <Image
          src="/topright.png"
          alt="Top Right"
          width={160}
          height={160}
          className="rounded-lg shadow-md"
        />
      </div>

      {/* Testimonial Section */}
      <div className="max-w-7xl mx-auto text-center">
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-red-500 tracking-widest uppercase">Promotion</h2>
          <h3 className="text-5xl font-bold text-gray-900 mt-2">See What Our Clients Say About Us</h3>
        </div>

        {/* Testimonial Card */}
        <div className="relative w-full md:w-2/3 mx-auto bg-white shadow-lg rounded-lg p-16 mb-12">
          {/* Quote Icon */}
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
            <Image
              src="/vikrant.png"
              alt="Client"
              width={112}
              height={112}
              className="rounded-full border-4 border-white shadow-md"
            />
          </div>

          <p className="text-lg text-gray-700 italic leading-relaxed mt-4">
            &quot;I had an exceptional experience with your service. The entire process was seamless, and the team was incredibly professional and attentive to my needs. The quality of the service exceeded my expectations, and I was particularly impressed by the prompt communication and timely delivery. Every detail was handled with care, and I felt valued as a customer. I will definitely be recommending your services to others. Keep up the great work!&quot;
          </p>
          <p className="text-gray-500 font-semibold mt-6">- Vikrant Mishra</p>

          {/* Navigation Buttons */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-200 w-12 h-12 flex justify-center items-center rounded-full cursor-pointer shadow-md hover:bg-gray-300 transition">
            <span className="text-2xl font-bold">&lt;</span>
          </div>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-200 w-12 h-12 flex justify-center items-center rounded-full cursor-pointer shadow-md hover:bg-gray-300 transition">
            <span className="text-2xl font-bold">&gt;</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
