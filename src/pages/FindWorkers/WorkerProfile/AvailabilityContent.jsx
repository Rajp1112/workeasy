import React from 'react';
import { Clock, Timer } from 'lucide-react'; // You can also use react-icons if needed

const AvailabilityContent = () => {
  const availableDays = [
    { day: 'Monday', active: true },
    { day: 'Tuesday', active: true },
    { day: 'Wednesday', active: true },
    { day: 'Thursday', active: true },
    { day: 'Friday', active: true },
    { day: 'Saturday', active: false },
    { day: 'Sunday', active: false },
  ];

  return (
    <div className="bg-white p-2">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Availability</h2>
        <p className="text-gray-600 mt-1">Working days, hours, and response time</p>
      </div>

      {/* Available Days */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">Available Days</p>
        <div className="flex flex-wrap gap-2">
          {availableDays.map(({ day, active }) => (
            <span
              key={day}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                active ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {day}
            </span>
          ))}
        </div>
      </div>

      {/* Working Hours */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-1">Working Hours</p>
        <div className="flex items-center gap-2 text-gray-800">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="text-sm">8:00 AM – 6:00 PM</span>
        </div>
      </div>

      {/* Response Time */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-1">Response Time</p>
        <div className="flex items-center gap-2 text-gray-800">
          <Timer className="w-4 h-4 text-gray-500" />
          <span className="text-sm">Usually responds within 30 minutes</span>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityContent;
