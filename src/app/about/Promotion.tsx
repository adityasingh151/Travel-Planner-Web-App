import React from 'react'
import Image from 'next/image'

const Promotion = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: 'url("./aboutusbg.png")' }}>
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-6xl font-bold">About Us</h1>
          <p className="mt-4 text-xl">Read</p>
        </div>
      </section>

      {/* Promotion Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2">
            <p className="text-sm text-red-600 font-bold uppercase">Promotion</p>
            <h2 className="text-4xl font-bold text-gray-900 mt-4">We Provide You Best India Sightseeing Tours</h2>
            <p className="mt-4 text-lg text-gray-700">
              With dedication and effort, we ensure that your experience with our services is free from any hassles or discomfort. We offer carefully selected options that avoid any complications or dissatisfaction, making sure you enjoy the best of what India has to offer. Our sightseeing tours are designed to showcase the beauty and diversity of India, providing you with unforgettable memories and a seamless travel experience.
            </p>
            <button className="mt-6 px-6 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600">
              View Packages
            </button>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0 flex justify-center">
            <div className="relative">
              <div className="rounded-full overflow-hidden w-80 h-80 border-8 border-gray-100 shadow-md">
                <Image 
                  src="/qutubminar.png" 
                  alt="India Tour" 
                  width={320} 
                  height={320} 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Promotion
