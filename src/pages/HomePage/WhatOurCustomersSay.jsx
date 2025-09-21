import React from 'react'
import { FaStar } from 'react-icons/fa';

const WhatOurCustomerSay = () => {
    const services = [
    { name: "Emily Davis", feedback: "Found an amazing electrician through WorkerFinder. Quick, professional, and affordable!", rating: 5, image: "https://i.pravatar.cc/100?img=1" },
    { name: "David Wilson", feedback: "The plumber I hired fixed my issue in 30 minutes. Great platform!", rating: 4, image: "https://i.pravatar.cc/100?img=2" },
    { name: "Maria Garcia", feedback: "Easy to use and trustworthy workers. Highly recommend!", rating: 4, image: "https://i.pravatar.cc/100?img=3" },
  ];

  return (
    <div className="py-12 bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-semibold text-gray-800">What Our Customers Say</h2>
        <p className="mt-2 text-gray-500">Real feedback from satisfied customers</p>

        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {services.map((service) => (
            <div
              key={service.name}
              className="flex flex-col items-center p-6 border bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer w-full max-w-xs min-h-[200px] justify-between"
            >
              <div className="flex flex-col items-center">
                <div className="flex items-center mb-4">
                  {[...Array(service.rating)].map((_, index) => (
                    <FaStar key={index} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-center mb-4 break-words">{service.feedback}</p>
              </div>
              <div className="flex items-center space-x-2">
                <img
                src={service.image}
                alt={service.name}
                className="w-16 h-16 rounded-full mb-2 object-cover"
              />
                <span className="text-gray-700 font-medium">{service.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WhatOurCustomerSay