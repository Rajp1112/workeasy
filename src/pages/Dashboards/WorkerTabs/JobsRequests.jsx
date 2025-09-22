import React from "react";
import {  Calendar, Clock, User } from "lucide-react";
import { FaMoneyBillAlt } from "react-icons/fa";
import { updateBooking } from "../../../features/booking/bookingSlice";
import { useDispatch } from "react-redux";

const JobsRequests = ({jobs, user}) => {
 const dispatch = useDispatch();
const handleAccept = (id) => {
    dispatch(
      updateBooking({
        id, 
        data: { booking_status: "accepted" }, 
      })
    )
      .then((res) => {
        console.log("Booking updated:", res);
      })
      .catch((err) => {
        console.error("Failed to update booking:", err);
      });
  };

 if (!Array.isArray(jobs) || jobs.length === 0) {
    return (
      <div className="p-2 text-center text-gray-500">
        No job requests available
      </div>
    );
  }

  return (
    <div className="p-2 gap-2 flex flex-col">

      {jobs.map((job, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow p-5 border flex flex-col gap-4 border-l-4 border-blue-600"
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold">{job?.booking_description}</h2>
              <p className="text-sm text-gray-500">Requested by {job?.customer_name}</p>
              <div className="flex  items-center gap-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {job?.booking_time}
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {job?.customer_name}
                </div>
                <div className="flex items-center gap-1">
                  <FaMoneyBillAlt className="w-4 h-4" />
                  {job?.price_total}
                </div>
              </div>
            </div>
            <div className="text-right">
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  job?.price_urgent_fee === 0
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {job?.price_urgent_fee !== 0 ? "High" : "Low"} priority
              </span>
              <p className="text-green-600 font-bold text-lg">{job?.price_total}</p>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <h1 className="font-semibold text-gray-900">Job Description</h1>
            <p>{job?.booking_description}</p>
            <p className="mt-1 font-medium">Location: {job?.customer_address}</p>
          </div>

          <div className="flex gap-3 mt-2">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700" onClick={() => handleAccept(job._id)}>
              Accept Job
            </button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
              View Details
            </button>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-100">
              Counter Offer
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobsRequests;
