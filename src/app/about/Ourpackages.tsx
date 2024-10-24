import Image from 'next/image';
import React from 'react';

const OurPackages = () => {
  const packages = [
    { title: 'Sikkim', price: '29,999', image: '/sikkim.png' },
    { title: 'Kashmir', price: '25,000', image: '/kashmir.png' },
    { title: 'Rajasthan', price: '5,999', image: '/rajasthan.jpg' },
    { title: 'Tamil Nadu', price: '21,000', image: '/tamilnadu.png' },
    { title: 'Goa', price: '20,000', image: '/goa.jpg' },
    { title: 'Delhi', price: '9,999', image: '/delhi.jpg' },
    { title: 'Madhya Pradesh', price: '15,999', image: '/madhyapradesh.png' },
    { title: 'Darjeeling', price: '15,999', image: '/darjeeling.png' },
    { title: 'Andaman', price: '45,000', image: '/andaman.png' },
    { title: 'Shimla', price: '5,999', image: '/shimla.png' },
    { title: 'Patnitop', price: '10,000', image: '/patnitop.png' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header */}
        <p className="text-sm text-red-600 font-bold uppercase mb-2">Explore More</p>
        <h2 className="text-4xl font-bold text-gray-900 mb-10">Our Packages</h2>

        {/* Grid of Packages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {packages.map((pkg, index) => (
            <div key={index} className="relative group">
              <Image
                src={pkg.image}
                alt={pkg.title}
                width={500}
                height={500}
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg transition-opacity group-hover:bg-opacity-50"></div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white text-xl font-semibold">{pkg.title}</h3>
                <p className="text-white text-lg font-semibold">Rs. {pkg.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPackages;
