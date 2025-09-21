import React from "react";

const services = [
  { name: "Electrician", icon: "⚡", bg: "bg-blue-100", emoji: "🔌" },
  { name: "Plumber", icon: "🔧", bg: "bg-green-100", emoji: "🔧" },
  { name: "Carpenter", icon: "🪓", bg: "bg-orange-100", emoji: "🪚" },
  { name: "Painter", icon: "🎨", bg: "bg-purple-100", emoji: "🎨" },
  { name: "Cleaner", icon: "✨", bg: "bg-pink-100", emoji: "🧹" },
  { name: "Mover", icon: "🚛", bg: "bg-indigo-100", emoji: "🚚" },
];

const PopularServices = () => {
  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-semibold text-gray-800">Popular Services</h2>
        <p className="mt-2 text-gray-500">Choose from our most requested services</p>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {services.map((service) => (
            <div
              key={service.name}
              className="flex flex-col items-center p-4 border bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
            >
              <div
                className={`p-4 rounded-full mb-2 ${service.bg} text-2xl`}
              >
                {service.icon}
              </div>
              <span className="text-gray-700 font-medium">{service.name}</span>
              <span className="text-2xl mt-1">{service.emoji}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularServices;
