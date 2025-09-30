import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';
import CompletionHeader from './CompletionHeader';
import WorkerSummary from './WorkerSummary';
import ServiceSummary from './ServiceSummary';
import ReviewForm from './ReviewForm';
import PaymentBreakdown from './PaymentBreakdown';
import ActionButtons from './ActionButtons';

const CompleteBooking = () => {
  const location = useLocation();
  const booking = location.state?.booking;
  const navigate = useNavigate();

  if (!booking) return <div>No booking data available</div>;

  return (
    <div className='min-h-screen bg-gray-50 p-6 flex flex-col items-center'>
      <div className='w-full max-w-5xl'>
        <button
          onClick={() => navigate(-1)}
          className='group inline-flex items-center gap-1 text-gray-900 font-medium relative'
        >
          <IoIosArrowRoundBack className='text-xl' />
          <span className='relative'>
            Back to Dashboard
            <span className='absolute left-0 -bottom-0.5 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full'></span>
          </span>
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl'>
        <div className='col-span-2 flex flex-col gap-6'>
          <CompletionHeader />
          <WorkerSummary booking={booking} />
          <ServiceSummary booking={booking} />
          <ReviewForm booking={booking} />
        </div>

        <div className='flex flex-col gap-6'>
          <PaymentBreakdown booking={booking} />
          <ActionButtons booking={booking} />
        </div>
      </div>
    </div>
  );
};

export default CompleteBooking;
