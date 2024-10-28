export default function Services() {
    return (
      <section className="py-12 bg-gray-100">
        {/* CATEGORY Heading */}
        <div className="text-center">
          <span className="text-red-500 uppercase tracking-widest text-sm font-semibold">Category</span>
          <h2 className="text-3xl font-bold mt-2">We Offer Best Services</h2>
        </div>
  
        {/* Service Cards */}
        <div className="mt-12 grid grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <img
              src="/guided-tours-icon.png"
              alt="Guided Tours"
              className="h-[71px] w-[70px]"
            />
            <h3 className="mt-4 text-lg font-semibold">Guided Tours</h3>
            <p className="mt-2 text-gray-600">
              Explore curated tours led by local experts, offering unique insights
              and unforgettable experiences.
            </p>
          </div>
  
          <div className="flex flex-col items-center text-center">
            <img
              src="/flights-icon.png"
              alt="Best Flights"
              className="h-[71px] w-[70px]"
            />
            <h3 className="mt-4 text-lg font-semibold">Best Flights Options</h3>
            <p className="mt-2 text-gray-600">
              Discover the most convenient and cost-effective flight options for
              your journey.
            </p>
          </div>
  
          <div className="flex flex-col items-center text-center">
            <img
              src="/adventure-icon.png"
              alt="Thrilling Adventures"
              className="h-[71px] w-[70px]"
            />
            <h3 className="mt-4 text-lg font-semibold">Thrilling Adventures</h3>
            <p className="mt-2 text-gray-600">
              Dive into heart-pounding experiences that push your boundaries and
              fuel your adventurous spirit.
            </p>
          </div>
  
          <div className="flex flex-col items-center text-center">
            <img
              src="/religious-icon.png"
              alt="Religious Tours"
              className="h-[71px] w-[70px]"
            />
            <h3 className="mt-4 text-lg font-semibold">Religious Tours</h3>
            <p className="mt-2 text-gray-600">
              Explore sacred destinations and spiritual journeys that inspire and
              uplift the soul.
            </p>
          </div>
        </div>
      </section>
    );
  }
  