/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'via.placeholder.com',  // Existing allowed domain
      'lh4.googleusercontent.com',  // Add this domain to allow images from Google
      'lh5.googleusercontent.com',  // If this is used too
    ],
  },
};

export default nextConfig;
