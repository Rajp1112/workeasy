import React from "react";

const updates = [
  { status: "inprogress", label: "Work in progress", time: "11:30 AM", note: "Installing new outlet in kitchen" },
  { status: "accepted", label: "Worker has arrived", time: "10:15 AM", note: "Started work on electrical outlets" },
  { status: "pending", label: "Worker en route", time: "9:45 AM", note: "ETA 10:00 AM" },
];

const LiveUpdates = ({ booking }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Live Updates</h3>

      <div className="flex flex-col gap-4">
        {updates.map((u, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <span
              className={`w-3 h-3 rounded-full mt-1 ${
                booking.booking_status === u.status ? "bg-green-500" : "bg-gray-400"
              }`}
            />
            <div>
              <p
                className={`font-medium ${
                  booking.booking_status === u.status ? "text-gray-900" : "text-gray-600"
                }`}
              >
                {u.label}
              </p>
              <p className="text-xs text-gray-500">
                {u.time} - {u.note}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveUpdates;
