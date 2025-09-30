import React from 'react';
import { CheckCircle } from 'lucide-react';

const ServiceSummary = ({ booking }) => {
  if (!booking) return null;

  return (
    <div className='bg-white rounded-xl shadow p-6'>
      <h3 className='text-lg font-semibold text-gray-900 mb-4'>
        Service Details
      </h3>
      <div className='text-sm text-gray-700 mb-2'>
        <p>
          <strong>Date:</strong> {booking.booking_date}
        </p>
        <p>
          <strong>Time:</strong> {booking.booking_time}
        </p>
        <p>
          <strong>Duration:</strong> {booking.booking_duration}
        </p>
      </div>

      <ul className='mt-2 space-y-2'>
        {booking.tasks?.map((task, index) => (
          <li
            key={index}
            className='flex items-center gap-2 text-sm text-gray-800'
          >
            <CheckCircle size={16} className='text-green-500' />
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceSummary;
