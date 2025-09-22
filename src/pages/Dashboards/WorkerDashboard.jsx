import React, { useEffect, useState } from "react";
import Tabs from "../../layout/Tabs";
import JobsRequests from "./WorkerTabs/JobsRequests";
import { Bell, CheckCircle, DollarSign, Ear, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkerBookings } from "../../features/booking/bookingSlice";
import AcceptedJobs from "./WorkerTabs/AcceptedJobs";
import { io } from "socket.io-client";
import API_BASE_URL from "../../app/apiConfig";
import EarningsTab from "./WorkerTabs/EarningsTab";
import RatingsTab from "./WorkerTabs/RatingsTab";
const socket = io(API_BASE_URL);
const WorkerDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
  if (!user?._id) return;

  // ------------------ Handlers ------------------
  const handleBookingCreated = (newBooking) => {
    if (newBooking.worker_id === user._id) {
      setJobs((prev) => [...prev, newBooking]);
    }
  };

  const handleBookingUpdated = (updatedBooking) => {
    if (updatedBooking.worker_id === user._id) {
      setJobs((prev) =>
        prev.map((b) => (b._id === updatedBooking._id ? updatedBooking : b))
      );
    }
  };

  const handleBookingDeleted = (deletedId) => {
    setJobs((prev) => prev.filter((b) => b._id !== deletedId));
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

  useEffect(() => {
    if (user?._id) {
      dispatch(getWorkerBookings(user._id))
        .then((res) => {
          setJobs(res.payload);
        })
        .catch((err) => {
          console.error("Failed to fetch booking:", err);
        });
    }
  }, [user]);

  // filter jobs to get only pending jobs
  const pendingJobs = jobs.filter((job) => job?.booking_status === "pending");
  const acceptedJobs = jobs.filter(
    (job) =>
      job?.booking_status === "accepted" ||
      job?.booking_status === "in-progress"
  );
  const tabs = [
    {
      name: "Job Requests",
      content: <JobsRequests jobs={pendingJobs} user={user} />,
    },
    {
      name: "Accepted Jobs",
      content: <AcceptedJobs jobs={acceptedJobs} user={user} />,
    },
    { name: "Earnings", content: <EarningsTab /> },
    { name: "Ratings", content: <RatingsTab /> },
  ];
  const summary = [
    {
      label: "This Month",
      value: "$2450",
      icon: <DollarSign className="text-green-600" />,
      sub: "+12.4%",
    },
    {
      label: "Rating",
      value: "4.9",
      icon: <Star className="text-yellow-500" />,
      sub: "⭐",
    },
    {
      label: "Total Jobs",
      value: "47",
      icon: <CheckCircle className="text-blue-600" />,
      sub: "98% completion",
    },
    {
      label: "New Requests",
      value: "3",
      icon: <Bell className="text-purple-600" />,
      sub: "1 urgent",
    },
  ];
  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <h1 className="text-3xl font-semibold mb-2">Worker Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Manage your jobs and track your earnings
      </p>

      {/* Summary Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summary.map((item, i) => (
          <div
            key={i}
            className="p-4 bg-white rounded-xl shadow flex flex-col items-start gap-1"
          >
            <div className="flex items-center gap-2">
              {item.icon}
              <span className="text-xl font-bold">{item.value}</span>
            </div>
            <span className="text-gray-500 text-sm">{item.label}</span>
            <span className="text-xs text-green-600">{item.sub}</span>
          </div>
        ))}
      </div>

      {/* Tabs Section */}
      <Tabs tabs={tabs} />
    </div>
  );
};

export default WorkerDashboard;
