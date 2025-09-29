import React from 'react';
import { Calendar, User, Clock } from 'lucide-react';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { updateBooking } from '../../../features/booking/bookingSlice';

const AcceptedJobs = ({ jobs = [] }) => {
  const dispatch = useDispatch();
  if (!Array.isArray(jobs) || jobs.length === 0) {
    return (
      <div className='p-6 text-center text-gray-500'>
        No accepted jobs available
      </div>
    );
  }
  const handleComplete = (id) => {
    dispatch(
      updateBooking({
        id,
        data: { booking_status: 'completed' },
      })
    )
      .then((res) => {
        console.log('Booking updated:', res);
      })
      .catch((err) => {
        console.error('Failed to update booking:', err);
      });
  };

  const handleInProgress = (id) => {
    dispatch(
      updateBooking({
        id,
        data: { booking_status: 'in-progress' },
      })
    )
      .then((res) => {
        console.log('Booking updated:', res);
      })
      .catch((err) => {
        console.error('Failed to update booking:', err);
      });
  };

  return (
    <div className='p-2'>
      {jobs.map((job) => (
        <div
          key={job._id}
          className='bg-white mb-3 shadow rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between border'
        >
          {/* Left Section: Job Info */}
          <div className='flex flex-col gap-2'>
            <h3 className='text-lg font-semibold'>{job.booking_description}</h3>
            <p className='text-gray-600 flex items-center gap-2'>
              <User size={16} /> Customer:{' '}
              <span className='font-medium'>{job.customer_name}</span>
            </p>
            <p className='text-gray-600 flex items-center gap-2'>
              <Calendar size={16} />{' '}
              {new Date(job.booking_date).toLocaleDateString()} at{' '}
              {job.booking_time}
            </p>
            <p className='text-gray-600 flex items-center gap-2'>
              <FaMoneyBillAlt /> ${job.price_total}
            </p>
          </div>

          {/* Right Section: Status + Actions */}
          <div className='flex flex-col md:flex-row md:items-center gap-3 mt-4 md:mt-0'>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1
                ${
                  job.booking_status === 'in-progress'
                    ? 'bg-blue-100 text-blue-600'
                    : job.booking_status === 'scheduled'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-600'
                }`}
            >
              <Clock size={14} /> {job.booking_status}
            </span>

            <button className='px-4 py-2 rounded-lg border font-medium hover:bg-gray-100'>
              Contact Customer
            </button>

            {job.booking_status === 'completed' ? null : job.booking_status ===
              'in-progress' ? (
              <button
                className='px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700'
                onClick={() => handleComplete(job._id)}
              >
                Mark Complete
              </button>
            ) : (
              <button
                className='px-4 py-2 rounded-lg bg-black text-white font-medium hover:bg-gray-800'
                onClick={() => handleInProgress(job._id)}
              >
                Start Job
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AcceptedJobs;
