import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaRegCreditCard } from "react-icons/fa";
import { updateBooking } from "../../../features/booking/bookingSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ActiveBookings = ({ bookings }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const getStatusStyles = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      case "in-progress":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  const handleCancel = (id) => {
    dispatch(
      updateBooking({
        id,
        data: { booking_status: "cancelled" },
      })
    )
      .then((res) => {
        console.log("Booking updated:", res);
      })
      .catch((err) => {
        console.error("Failed to update booking:", err);
      });
  };
  const handleTrackBooking = (booking) => {
    navigate(`/track-booking/${booking._id}`, { state: { booking } });
  };
  console.log(bookings);

  return (
    <div className="flex flex-col gap-4">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-lg shadow border"
        >
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-semibold">{booking?.worker_skills[0]}</span>
              <span className="text-gray-500 text-sm">
                with {booking?.worker_name}
              </span>
              <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                <FaCalendarAlt className="w-4 h-4" />
                <span>
                  {booking?.booking_date} at {booking?.booking_time}
                </span>
              </div>
              <div className="flex gap-2 !mt-2 sm:mt-0">
                <button
                  className="px-3 py-1 border rounded text-gray-700 hover:bg-gray-100"
                  onClick={() => handleTrackBooking(booking)}
                >
                  Track Order
                </button>
                <button className="px-3 py-1 border rounded text-gray-700 hover:bg-gray-100">
                  Contact Worker
                </button>
                {booking?.booking_status === "pending" && (
                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => handleCancel(booking._id)}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <FaMapMarkerAlt className="w-4 h-4" />
            <span>{booking?.customer_city}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <FaRegCreditCard className="w-4 h-4" />
            <span>{booking?.price_total}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2 sm:mt-0">
            <div
              className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusStyles(
                booking?.booking_status
              )}`}
            >
              {booking?.booking_status}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActiveBookings;
