import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";

import OrderStatusSection from "./OrderStatusSection";
import QuickActionsSidebar from "./QuickActionsSidebar";
import WorkerDetails from "./WorkerDetails";
import PaymentInfo from "./PaymentInfo";
import ServiceDetails from "./ServiceDetails";
import LiveUpdates from "./LiveUpdates";

const BookingTrack = () => {
  const location = useLocation();
  const booking = location.state?.booking;
  const navigate = useNavigate();

  if (!booking) return <div>No booking data available</div>;
  const handleMarkComplete = () => {
    navigate(`/complete-booking/${booking._id}`, { state: { booking } });
  };

  return (
    
    <div className='min-h-screen bg-gray-50 p-6 flex flex-col items-center gap-8'>
      {/* Back Button */}
      <div className="w-full max-w-5xl">
        <button
          onClick={() => navigate(-1)}
          className="group inline-flex items-center gap-1 text-gray-900 font-medium relative"
        >
          <IoIosArrowRoundBack className="text-xl" />
          <span className="relative">
            Back to Dashboard
            <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
          </span>
        </button>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Left Section */}
        <div className="col-span-2 flex flex-col gap-6">
          <OrderStatusSection booking={booking} />
          <WorkerDetails worker={{ 
            name: booking.worker_name,
            role: booking.worker_skills[0],
            rating: 4.9,
            reviews: 127
          }} />
          <ServiceDetails booking={booking} />
          <LiveUpdates booking={booking} />
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          <QuickActionsSidebar worker={booking.worker_name} />
          <PaymentInfo payment={{
            serviceCost: booking.price_service_fee,
            total: booking.price_total
          }} />
          <button className="w-full bg-black text-white py-3 rounded-xl font-medium" onClick={handleMarkComplete}>
            Mark as Complete
          </button>
          <button className="w-full border border-gray-300 py-3 rounded-xl font-medium">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingTrack;
