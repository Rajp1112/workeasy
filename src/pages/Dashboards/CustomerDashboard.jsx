import React, { useEffect } from "react";
import Tabs from "../../layout/Tabs";
import ActiveBookings from "./CustomerTabs/ActiveBookings";
import BookingHistory from "./CustomerTabs/BookingHistory";
import PaymentHistory from "./CustomerTabs/PaymentHistory";
import { useDispatch, useSelector } from "react-redux";
import {  getCustomerBookings } from "../../features/booking/bookingSlice";

const CustomerDashboard = () => {
  const dispatch = useDispatch();
const { user } = useSelector((state) => state.auth); 
const [bookings, setBookings] = React.useState([]);
  useEffect(() => {
    if (user?._id) {
      dispatch(getCustomerBookings(user._id))
        .then((res) => {
          setBookings(res.payload);
        })
        .catch((err) => {
          console.error("Failed to fetch booking:", err);
        });
    }
  }, [ user]);

// filter bookings to get only active bookings
const activeBookings = bookings.filter(
  (b) => b?.booking_status === "pending" || b?.booking_status === "in-progress"
);

const completedBookings = bookings.filter(
  (b) => b?.booking_status === "completed"
);

  const tabs = [
    { name: "Active Bookings", content: <ActiveBookings bookings={activeBookings} /> },
    { name: "Booking History", content: <BookingHistory bookings={completedBookings} /> },
    { name: "Payment History", content: <PaymentHistory bookings={bookings} /> },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <h1 className="text-3xl font-semibold mb-2">Customer Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Manage your bookings and track your service history
      </p>

      {/* Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded-lg shadow flex flex-col items-start">
          <span className="text-blue-600 font-bold text-xl">2</span>
          <span className="text-gray-600 text-sm">Active Bookings</span>
        </div>
        <div className="p-4 bg-white rounded-lg shadow flex flex-col items-start">
          <span className="text-green-600 font-bold text-xl">3</span>
          <span className="text-gray-600 text-sm">Completed Jobs</span>
        </div>
        <div className="p-4 bg-white rounded-lg shadow flex flex-col items-start">
          <span className="text-purple-600 font-bold text-xl">$920</span>
          <span className="text-gray-600 text-sm">Total Spent</span>
        </div>
        <div className="p-4 bg-white rounded-lg shadow flex flex-col items-start">
          <span className="text-yellow-500 font-bold text-xl">4.7</span>
          <span className="text-gray-600 text-sm">Avg Rating Given</span>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs tabs={tabs} />
    </div>
  );
};

export default CustomerDashboard;
