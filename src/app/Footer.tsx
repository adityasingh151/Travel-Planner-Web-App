import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faInfinity } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  return (
    <footer className="relative py-12 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {/* Left Section - Let's Go Logo and Social Links */}
        <div className="flex flex-col items-start">
          <div className="flex items-center space-x-2">
            <img src="/lets-go-icon.png" alt="Let's Go" className="h-8 w-auto" />
          </div>
          <div className="mt-4 flex space-x-4">
            {/* Social Media Links with aria-label for accessibility */}
            <a href="#" className="text-red-500 text-xl" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="#" className="text-red-500 text-xl" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="text-red-500 text-xl" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="text-red-500 text-xl" aria-label="Infinity">
              <FontAwesomeIcon icon={faInfinity} />
            </a>
          </div>
        </div>

        {/* Center Section - Company and Destinations Links */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul>
              <li><a href="#" className="text-gray-500 hover:text-red-500">About Us</a></li>
              <li><a href="#" className="text-gray-500 hover:text-red-500">Careers</a></li>
              <li><a href="#" className="text-gray-500 hover:text-red-500">Blog</a></li>
              <li><a href="#" className="text-gray-500 hover:text-red-500">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Destinations</h4>
            <ul>
              <li><a href="#" className="text-gray-500 hover:text-red-500">Mumbai</a></li>
              <li><a href="#" className="text-gray-500 hover:text-red-500">Sikkim</a></li>
              <li><a href="#" className="text-gray-500 hover:text-red-500">Kashmir</a></li>
              <li><a href="#" className="text-gray-500 hover:text-red-500">Andaman</a></li>
            </ul>
          </div>
        </div>

        {/* Right Section - Newsletter Signup */}
        <div className="flex flex-col items-start">
          <h4 className="font-semibold text-gray-900 mb-4">Join Our Newsletter</h4>
          <form className="flex space-x-2">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button className="px-6 py-2 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600">
              Subscribe
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-2">* We will send you weekly updates for your better tour packages.</p>
        </div>
      </div>

      {/* Mountain SVG at the bottom right */}
      <div className="absolute right-0 bottom-0">
        <img src="/mountain.svg" alt="Mountain" className="h-24 w-auto" />
      </div>
    </footer>
  );
}

export default Footer;
