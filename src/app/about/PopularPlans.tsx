import Image from 'next/image';

const PopularPlans = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-96">
        <Image
          src="/wanderlust.png" // Replace this with your image path
          alt="Wanderlust Image"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="absolute inset-0 bg-black opacity-30 z-10"></div>
        <h1 className="absolute text-white text-6xl font-bold left-8 bottom-8 z-20">Wanderlust</h1>
      </div>

      {/* Tour Plans Section */}
      <div className="flex flex-col items-center py-24"> {/* Increased padding */}
        <h2 className="text-3xl font-bold mb-4">Our Popular Tour Plans</h2>
        <p className="text-gray-500 text-center max-w-2xl mb-8">
          Our popular plans include religious tours, honeymoon packages, and adventure tours, each
          carefully designed to provide unique and memorable experiences.
        </p>

        {/* Trend Section */}
        <div className="flex flex-col md:flex-row items-center justify-around w-full max-w-4xl space-y-8 md:space-y-0">
          {/* Card 1 */}
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4">
              <Image
                src="/vacation78.png" // Placeholder for vacation
                alt="Vacation"
                width={96}
                height={96}
              />
            </div>
            {/* <h3 className="text-xl font-semibold">Vacations</h3>
            <p className="text-indigo-600 text-4xl font-bold">78%</p> */}
          </div>

          {/* Card 2 */}
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4">
              <Image
                src="/honeymoon55.png" // Placeholder for honeymoon
                alt="Honeymoon"
                width={96}
                height={96}
              />
            </div>
            {/* <h3 className="text-xl font-semibold">Honeymoon</h3>
            <p className="text-pink-600 text-4xl font-bold">55%</p> */}
          </div>

          {/* Card 3 */}
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4">
              <Image
                src="/religioustours30.png" // Placeholder for religious tours
                alt="Religious Tours"
                width={96}
                height={96}
              />
            </div>
            {/* <h3 className="text-xl font-semibold">Religious Tours</h3>
            <p className="text-purple-600 text-4xl font-bold">30%</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularPlans;
