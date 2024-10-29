"use client";

import Link from 'next/link';
import { useRef } from 'react';
import { Network, Users, Settings, RefreshCw } from 'lucide-react';

const HomePage = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    if (featuresRef.current) {
      featuresRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center h-[calc(100vh-100px)] bg-gradient-to-r from-gray-50 to-gray-400">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Taxonomy Development Tools</h1>
          <h2 className="text-2xl text-white mb-8">Build, curate, and publish BICAN taxonomies effortlessly.</h2>
          <div className="flex justify-center space-x-4">
            <Link href="/taxonomies" className="px-6 py-3 bg-white text-orange-400 font-semibold rounded-md shadow-md hover:bg-gray-100 transition duration-300 min-w-[150px] text-center">
                Get Started
            </Link>
            <button
              onClick={scrollToFeatures}
              className="px-6 py-3 bg-white text-orange-400 font-semibold rounded-md shadow-md hover:bg-gray-100 transition duration-300 min-w-[150px] text-center"
            >
              Learn More
            </button>
            <Link href="/catalog" className="px-6 py-3 bg-orange-400 text-white font-semibold rounded-md shadow-md hover:bg-gray-100 transition duration-300 min-w-[150px] text-center">
                Catalog
            </Link>
          </div>
        </div>
      </div>

      <div ref={featuresRef} className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Network className="h-12 w-12 mx-auto text-orange-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Graphical Editor</h3>
              <p>Easily convert informal taxonomies into the standard CAS structure.</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto text-orange-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Collaborative Editing</h3>
              <p>Manage taxonomies collaboratively with concurrent editing.</p>
            </div>
            <div className="text-center">
              <Settings className="h-12 w-12 mx-auto text-orange-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Flexible Customization</h3>
              <p>Customize taxonomies with additional fields and links to datasets.</p>
            </div>
            <div className="text-center">
              <RefreshCw className="h-12 w-12 mx-auto text-orange-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">GitHub Synchronization</h3>
              <p>Keep taxonomies in sync with seamless GitHub integration.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;