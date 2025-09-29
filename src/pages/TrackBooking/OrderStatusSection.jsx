import React from "react";
import { CheckCircle, Clock } from "lucide-react";

const statuses = [
  { key: "pending", label: "Booking Confirmed", desc: "Your booking has been confirmed" },
  { key: "accepted", label: "Worker En Route", desc: "Worker is on the way to your location" },
  { key: "inprogress", label: "Work in Progress", desc: "Work has started at your location" },
  { key: "completed", label: "Work Completed", desc: "Work completion and payment" },
];

const OrderStatusSection = ({ booking }) => {
  const currentStatus = booking?.booking_status || "pending";
  const statusIndex = statuses.findIndex((s) => s.key === currentStatus);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Order Status</h2>
      <p className="text-sm text-gray-500 mb-2">Order ID: {booking?._id}</p>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2 rounded-full mb-6">
        <div
          className="bg-black h-2 rounded-full transition-all"
          style={{ width: `${((statusIndex + 1) / statuses.length) * 100}%` }}
        />
      </div>

      {/* Status Timeline */}
      <div className="flex flex-col gap-4">
        {statuses.map((s, idx) => (
          <div key={s.key} className="flex items-start gap-3">
            {idx <= statusIndex ? (
              <CheckCircle className="text-green-500 w-6 h-6" />
            ) : (
              <Clock className="text-gray-400 w-6 h-6" />
            )}
            <div>
              <p className="font-medium text-gray-900">{s.label}</p>
              <p className="text-sm text-gray-500">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderStatusSection;
