import { CheckCircle, Star } from 'lucide-react';
import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaRegCreditCard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BookingHistory = ({ bookingHistory }) => {
  console.log(bookingHistory);

  const getStatusStyles = () => 'bg-green-100 text-green-700';
  const navigate = useNavigate();
  const handleTrackBooking = (booking) => {
    console.log(booking);

    navigate(`/track-booking/${booking._id}`, {
      state: { booking },
    });
  };
  if (!bookingHistory || bookingHistory.length === 0) {
    return (
      <div className='text-center text-gray-500 py-10'>
        Bookings history not found.
      </div>
    );
  }
  return (
    <div className='flex flex-col gap-4'>
      {bookingHistory?.map((booking) => (
        <div
          key={booking._id}
          className='flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-lg shadow border'
        >
          <div className='flex items-center gap-4'>
            <div className='flex flex-col gap-1'>
              <span className='font-semibold'>
                {booking?.booking_description}
              </span>
              <span className='text-gray-500 text-sm'>
                with {booking?.worker_name}
              </span>
              <div className='flex items-center gap-2 text-gray-500 text-sm mt-1'>
                <FaCalendarAlt className='w-4 h-4' />
                <span>
                  {new Date(booking?.booking_date).toLocaleDateString()} at{' '}
                  {booking?.booking_time}
                </span>
              </div>
              <div className='flex gap-2 mt-2 sm:mt-0'>
                <button
                  className='px-3 py-1 border rounded text-gray-700 hover:bg-gray-100'
                  onClick={() => handleTrackBooking(booking)}
                >
                  View Details
                </button>
                <button className='px-3 py-1 border rounded text-gray-700 hover:bg-gray-100'>
                  Contact Worker
                </button>
              </div>
            </div>
          </div>

          <div className='flex items-center gap-2 text-gray-500 text-sm'>
            <FaMapMarkerAlt className='w-4 h-4' />
            <span>{booking?.customer_address}</span>
          </div>
          <div className='flex items-center gap-2 text-gray-500 text-sm'>
            <FaRegCreditCard className='w-4 h-4' />
            <span>{booking?.price_total}</span>
          </div>
          <div className='flex flex-col  gap-1 mt-2 sm:mt-0'>
            <div
              className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusStyles()}`}
            >
              <CheckCircle className='w-4 h-4 inline-block mr-1' />
              {booking?.booking_status}
            </div>
            <span className='text-gray-500 text-sm'>
              <Star className='w-4 h-4  mr-1 text-yellow-500' />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingHistory;
