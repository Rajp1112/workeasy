import React, { useEffect, useState } from 'react';
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { io } from 'socket.io-client';
import API_BASE_URL from '../../app/apiConfig';

const socket = io(API_BASE_URL, { autoConnect: false });

const statuses = [
  {
    key: 'pending',
    label: 'Booking Confirmed',
    desc: 'Your booking has been confirmed',
  },
  {
    key: 'accepted',
    label: 'Worker En Route',
    desc: 'Worker is on the way to your location',
  },
  {
    key: 'in-progress',
    label: 'Work in Progress',
    desc: 'Work has started at your location',
  },
  {
    key: 'completed',
    label: 'Work Completed',
    desc: 'Work completion and payment',
  },
  {
    key: 'cancelled',
    label: 'Booking Cancelled',
    desc: 'This booking was cancelled',
  },
];

const OrderStatusSection = ({ booking }) => {
  const [liveBooking, setLiveBooking] = useState(booking);

  useEffect(() => {
    if (!booking?._id) return;

    socket.connect();

    const handleBookingUpdated = (updatedBooking) => {
      if (updatedBooking?._id === booking._id) {
        setLiveBooking(updatedBooking);
      }
    };

    socket.on('bookingUpdated', handleBookingUpdated);

    return () => {
      socket.off('bookingUpdated', handleBookingUpdated);
      socket.disconnect();
    };
  }, [booking?._id]);

  const currentStatus = liveBooking?.booking_status || 'pending';
  const statusIndex = statuses.findIndex((s) => s.key === currentStatus);
  const isCancelled = currentStatus === 'cancelled';

  return (
    <div className='bg-white rounded-xl shadow p-6'>
      <h2 className='text-lg font-semibold mb-4'>Order Status</h2>
      <p className='text-sm text-gray-500 mb-2'>Order ID: {liveBooking?._id}</p>

      {/* Progress Bar */}
      {!isCancelled && statusIndex >= 0 && (
        <div className='w-full bg-gray-200 h-2 rounded-full mb-6'>
          <div
            className='bg-black h-2 rounded-full transition-all'
            style={{
              width: `${((statusIndex + 1) / (statuses.length - 1)) * 100}%`,
            }}
          />
        </div>
      )}

      {/* Status Timeline */}
      <div className='flex flex-col gap-4'>
        {isCancelled ? (
          <div className='flex items-start gap-3'>
            <XCircle className='text-red-500 w-6 h-6' />
            <div>
              <p className='font-medium text-red-600'>Booking Cancelled</p>
              <p className='text-sm text-gray-500'>
                This booking was cancelled
              </p>
            </div>
          </div>
        ) : (
          statuses.map((s, idx) => {
            if (s.key === 'cancelled') return null;

            const isActive = idx <= statusIndex;
            const isCurrent = s.key === currentStatus;

            return (
              <div key={s.key} className='flex items-start gap-3'>
                {isActive ? (
                  <CheckCircle className='text-green-500 w-6 h-6 bg-green-100 rounded-full' />
                ) : (
                  <Clock className='text-gray-400 w-6 h-6' />
                )}
                <div>
                  <p
                    className={`font-medium ${
                      isCurrent ? 'text-green-500' : 'text-gray-900'
                    }`}
                  >
                    {s.label}
                  </p>
                  <p className='text-sm text-gray-500'>{s.desc}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default OrderStatusSection;
