import React from "react";
import { FaHome, FaBolt, FaBuilding } from "react-icons/fa";
import profilesection from "../../../assets/profilesection.jpg";
import profilesection2 from "../../../assets/profilesection2.jpg";

const PortfolioContent = () => {
  const portfolioItems = [
    {
      title: "Smart Home Installation",
      description: "Complete smart home setup with automated lighting",
      image: profilesection,
      icon: <FaHome className="text-3xl text-blue-500" />,
    },
    {
      title: "Panel Upgrade",
      description: "Electrical panel upgrade for a 3-bedroom house",
      image: profilesection2,
      icon: <FaBolt className="text-3xl text-yellow-500" />,
    },
    {
      title: "Office Wiring",
      description: "Commercial office electrical installation",
      image: profilesection,
      icon: <FaBuilding className="text-3xl text-gray-700" />,
    },
  ];

  return (
    <div className="bg-white p-2">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Portfolio</h2>
        <p className="text-gray-600 mt-1">
          Explore some of our completed projects
        </p>
      </div>

      {/* Flex Items Section */}
      <div className="flex flex-wrap -mx-2 items-stretch">
        {portfolioItems.map((item, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4 ">
            <div className="h-full flex flex-col bg-gray-50 rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
              {/* Image + Icon */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-white p-2 rounded-full shadow">
                  {item.icon}
                </div>
              </div>

              {/* Text */}
              <div className="flex flex-col flex-grow p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1 flex-grow">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioContent;
