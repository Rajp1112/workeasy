import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaRegCreditCard } from "react-icons/fa";



const BookingHistory = ({ bookingHistory }) => {
  const getStatusStyles = () => "bg-green-100 text-green-700";

  return (
    <div className="flex flex-col gap-4">
      {bookingHistory.map((booking) => (
        <div
          key={booking.id}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-lg shadow border"
        >
          <div className="flex items-center gap-4">
            <img
              src={booking.image}
              alt={booking.worker}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col gap-1">
              <span className="font-semibold">{booking.service}</span>
              <span className="text-gray-500 text-sm">
                with {booking.worker}
              </span>
              <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                <FaCalendarAlt className="w-4 h-4" />
                <span>
                  {booking.date} at {booking.time}
                </span>
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <button className="px-3 py-1 border rounded text-gray-700 hover:bg-gray-100">
                  View Details
                </button>
                <button className="px-3 py-1 border rounded text-gray-700 hover:bg-gray-100">
                  Contact Worker
                </button>
              </div>
            </div>
          </div>

            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <FaMapMarkerAlt className="w-4 h-4" />
              <span>{booking.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <FaRegCreditCard className="w-4 h-4" />
              <span>{booking.price}</span>
            </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2 sm:mt-0">
            <div
              className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusStyles()}`}
            >
              Confirmed
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingHistory;
