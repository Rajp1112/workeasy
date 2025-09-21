import React from 'react'
import { FaStar } from 'react-icons/fa';
import IconButton from '../../components/IconButton';
import { IoMdAdd } from "react-icons/io";
const FeaturedWorkers = () => {
  const services = [
    { name: "John Martinez", profession: "Electrician", rating: 4.9, reviews: 127, rate: 45, bg: "bg-blue-100" },
    { name: "Sarah Johnson", profession: "Plumber", rating: 4.8, reviews: 89, rate: 50, bg: "bg-green-100" },
    { name: "Mike Chen", profession: "Carpenter", rating: 5.0, reviews: 156, rate: 40, bg: "bg-orange-100" },
    { name: "Lisa Brown", profession: "Painter", rating: 4.7, reviews: 98, rate: 35, bg: "bg-purple-100" },
  ];

  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-semibold text-gray-800">Featured Workers</h2>
        <p className="mt-2 text-gray-500">Meet our top-rated professionals</p>

        <div className="mt-8 flex flex-wrap justify-center  gap-6">
          {services.map((service) => (
            <div
              key={service.name}
              className="flex flex-col items-center p-10 px-14 border bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
            >
              <div
                className={`p-4 rounded-full mb-2 ${service.bg} text-2xl`}
              >
                👷‍♂️
              </div>
              <div className="flex flex-col items-center space-y-1">

              <span className="text-gray-700 font-medium">{service.name}</span>
              <span className="text-gray-500 text-sm">{service.profession}</span>
              <div className="flex items-center mt-1 ">
    <FaStar className="mr-1 text-yellow-400" /> 
    <span>{service.rating} ({service.reviews} reviews)</span>
  </div>
              <span className="text-lg font-bold">${service.rate}/hr</span>
              </div>
              <IconButton
                icon={IoMdAdd}
                label="Book Now"
                variant=""
                // onClick={() => navigate('/register')}
            />
              {/* <button className="mt-2 bg-black text-white px-4 py-2 w-full rounded">Book Now</button> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturedWorkers