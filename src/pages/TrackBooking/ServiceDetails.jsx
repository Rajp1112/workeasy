import React from "react";
import { MapPin } from "lucide-react";

const ServiceDetails = ({ booking }) => {
  const scheduledDate = new Date(booking.booking_date).toLocaleDateString();
  const scheduledTime = booking.booking_time;
  const duration = booking.booking_duration;
  const estimatedCompletion = "12:15 PM"; // Example, calculate dynamically if needed

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Service Details</h3>

      <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
        <p className="text-gray-600">Scheduled Time</p>
        <p className="font-medium">{scheduledDate} at {scheduledTime}</p>

        <p className="text-gray-600">Duration</p>
        <p className="font-medium">{duration}</p>

        <p className="text-gray-600">Started</p>
        <p className="font-medium">10:15 AM</p>

        <p className="text-gray-600">Est. Completion</p>
        <p className="font-medium">{estimatedCompletion}</p>
      </div>

      <div className="flex items-start gap-2 mb-4">
        <MapPin className="text-gray-500 w-4 h-4 mt-1" />
        <p className="text-sm text-gray-800">{booking.customer_address}</p>
      </div>

      <div>
        <p className="text-gray-600 mb-1 text-sm">Job Description</p>
        <p className="bg-gray-100 text-sm text-gray-800 p-2 rounded">
          {booking.booking_description}
        </p>
      </div>
    </div>
  );
};

export default ServiceDetails;
