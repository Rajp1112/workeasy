import React from 'react';
import { FaSearch, FaCreditCard, FaStar } from 'react-icons/fa';

const HowItWork = () => {
  const steps = [
    { icon: FaSearch, title: "Search", description: "Find workers by skill and location in your area", step: 1 },
    { icon: FaCreditCard, title: "Book & Pay", description: "Book instantly and pay securely through our platform", step: 2 },
    { icon: FaStar, title: "Rate", description: "Rate your experience and help others find quality workers", step: 3 },
  ];

  return (
    <div className="py-12 bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">How It Works</h2>
        <p className="text-center text-gray-500 mb-8">Get the job done in three simple steps</p>

        <div className="flex flex-wrap justify-center gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 border bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer w-full max-w-xs min-h-[200px] justify-between"
            >
              <div className="flex flex-col items-center">
                <div className="flex justify-center mb-4">
                  <span className="inline-flex items-center bg-gray-800 justify-center w-12 h-12 rounded-full">
                    <step.icon className="w-6 h-6 text-white" />
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-center mb-4 break-words">{step.description}</p>
              </div>
              <span className="mt-4 inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-500">
                {step.step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWork;