import React, { useEffect, useState } from "react";
import Tabs from "../../layout/Tabs";
import ActiveBookings from "./CustomerTabs/ActiveBookings";
import BookingHistory from "./CustomerTabs/BookingHistory";
import PaymentHistory from "./CustomerTabs/PaymentHistory";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerBookings } from "../../features/booking/bookingSlice";
import { io } from "socket.io-client";
import API_BASE_URL from "../../app/apiConfig";
const socket = io(API_BASE_URL);
const CustomerDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [bookings, setBookings] = useState([]);
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
  }, [user]);
  useEffect(() => {
  if (!user?._id) return;

  // ------------------ Handlers ------------------
  const handleBookingCreated = (newBooking) => {
    if (newBooking.customer_id === user._id) {
      setBookings((prev) => [...prev, newBooking]);
    }
  };

  const handleBookingUpdated = (updatedBooking) => {
    if (updatedBooking.customer_id === user._id) {
      setBookings((prev) =>
        prev.map((b) => (b._id === updatedBooking._id ? updatedBooking : b))
      );
    }
  };

  const handleBookingDeleted = (deletedId) => {
    setBookings((prev) => prev.filter((b) => b._id !== deletedId));
  };

  // ------------------ Subscribe ------------------
  socket.on("bookingCreated", handleBookingCreated);
  socket.on("bookingUpdated", handleBookingUpdated);
  socket.on("bookingDeleted", handleBookingDeleted);

  // ------------------ Cleanup ------------------
  return () => {
    socket.off("bookingCreated", handleBookingCreated);
    socket.off("bookingUpdated", handleBookingUpdated);
    socket.off("bookingDeleted", handleBookingDeleted);
  };
}, [user?._id]);

  // filter bookings to get only active bookings
  const activeBookings = bookings.filter(
    (b) =>
      b?.booking_status === "pending" ||
      b?.booking_status === "in-progress" ||
      b?.booking_status === "accepted"
  );

  const completedBookings = bookings.filter(
    (b) => b?.booking_status === "completed"
  );

  const tabs = [
    {
      name: "Active Bookings",
      content: <ActiveBookings bookings={activeBookings} user={user} />,
    },
    {
      name: "Booking History",
      content: <BookingHistory bookingHistory={completedBookings} />,
    },
    {
      name: "Payment History",
      content: <PaymentHistory bookings={bookings} />,
    },
  ];
  const totalSpent = bookings
    .filter((b) => b?.booking_status === "completed")
    .reduce((sum, b) => sum + (Number(b?.price_total) || 0), 0);
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
          <span className="text-blue-600 font-bold text-xl">
            {activeBookings.length}
          </span>
          <span className="text-gray-600 text-sm">Active Bookings</span>
        </div>
        <div className="p-4 bg-white rounded-lg shadow flex flex-col items-start">
          <span className="text-green-600 font-bold text-xl">
            {completedBookings.length}
          </span>
          <span className="text-gray-600 text-sm">Completed Jobs</span>
        </div>
        <div className="p-4 bg-white rounded-lg shadow flex flex-col items-start">
          <span className="text-purple-600 font-bold text-xl">
            ${totalSpent}
          </span>
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
