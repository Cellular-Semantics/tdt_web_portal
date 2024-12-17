"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const ErrorPage: React.FC<ErrorProps> = ({ error, reset }) => {
  const [isLogVisible, setIsLogVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Log the error to the console
    console.error('An error occurred:', error);

    // Optionally, send the error details to an external logging service
    // fetch('/api/log-error', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ error: error.message, stack: error.stack }),
    // });
  }, [error]);

  const toggleLogVisibility = () => {
    setIsLogVisible(!isLogVisible);
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-200px)] bg-gray-100">
      <div className="text-center justify-center">
        <div className="flex items-center justify-center" style={{ position: "relative", width: "400px", height: "400px", margin: "auto" }}>
          <Image
            src="/tdt/images/error.png"
            alt="Error Image"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
        <p className="text-lg text-gray-700 mb-8">Please try again later or contact support if the issue persists.</p>
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300"
          >
            Retry
          </button>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-md shadow-md hover:bg-gray-700 transition duration-300"
          >
            Go to Home
          </button>
        </div>
        <button
          onClick={toggleLogVisibility}
          className="px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-md shadow-md hover:bg-gray-400 transition duration-300"
        >
          {isLogVisible ? 'Hide Error Log' : 'Show Error Log'}
        </button>
        {isLogVisible && (
          <div className="mt-4 p-4 bg-white border border-gray-300 rounded-md shadow-md text-left">
            <h2 className="text-xl font-bold mb-2">Error Details</h2>
            <pre className="text-sm text-red-600 whitespace-pre-wrap">{error.message}</pre>
            <pre className="text-sm text-gray-600 whitespace-pre-wrap">{error.stack}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorPage;