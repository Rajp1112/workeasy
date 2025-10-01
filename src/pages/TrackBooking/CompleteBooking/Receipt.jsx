import React from 'react';
import {
  Calendar,
  Clock,
  FileText,
  Hammer,
  Mail,
  MapPin,
  Phone,
  User,
  Wrench,
} from 'lucide-react';

const Receipt = ({ data }) => {
  const subtotal = data?.price_total || 0;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const paymentMethod = 'UPI';
  const notes = 'Please ensure someone is home during the service window.';

  return (
    <div className='w-[794px] mx-auto bg-white shadow-lg text-[12px] leading-tight '>
      {/* Header */}
      <div className='bg-gray-900 text-white p-8'>
        <div className='flex items-start justify-between'>
          <div>
            <div className='flex items-center space-x-2 cursor-pointer'>
              {/* <div className='bg-gray-900 text-white p-2 rounded-lg'>
                <Hammer className='h-6 w-6' />
              </div> */}
              <span className='font-bold text-lg text-white'>WorkerFinder</span>
            </div>
            <p className='text-white/80 text-sm'>Professional Home Services</p>
            <p className='text-white/80 text-sm'>contact@workeasy.com</p>
            <p className='text-white/80 text-sm'>+91 63541 16966</p>
          </div>
          <div className='text-right'>
            <div className='flex items-center gap-2 justify-end mb-2'>
              <FileText className='w-6 h-6' />
              <h2 className='text-white font-semibold'>RECEIPT</h2>
            </div>
            <p className='text-white/90'># {data?._id}</p>
          </div>
        </div>
      </div>

      {/* Receipt Details */}
      <div className='p-8'>
        {/* Date and Time */}
        <div className='flex items-start justify-between mb-8'>
          <div className='space-y-2'>
            <div className='flex items-center gap-2 text-gray-500'>
              <Calendar className='w-4 h-4' />
              <span className='text-sm'>{data?.booking_date}</span>
            </div>
            <div className='flex items-center gap-2 text-gray-500'>
              <Clock className='w-4 h-4' />
              <span className='text-sm'>{data?.booking_time}</span>
            </div>
          </div>

          <div className='flex flex-col items-end gap-2'>
            {/* Payment Status Chip */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                data?.booking_status === 'completed'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {data?.booking_status === 'completed' ? 'Paid' : 'Unpaid'}
            </span>

            {/* Payment Method Chip */}
            {/* <span className='px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-medium'>
              {paymentMethod}
            </span> */}
          </div>
        </div>

        {/* Customer and Worker Info */}
        <div className='grid md:grid-cols-2 gap-8 mb-8'>
          {/* Customer Info */}
          <div className='space-y-3'>
            <div className='flex items-center gap-2 mb-3'>
              <User className='w-5 h-5 text-gray-900' />
              <h3 className='text-gray-900 font-semibold'>Customer Details</h3>
            </div>
            <div className='space-y-2 pl-7'>
              <p>{data?.customer_name}</p>
              <div className='flex items-start gap-2 text-gray-500 text-sm'>
                <Phone className='w-4 h-4 mt-0.5 flex-shrink-0' />
                <span>{data?.customer_phone}</span>
              </div>
              <div className='flex items-start gap-2 text-gray-500 text-sm'>
                <Mail className='w-4 h-4 mt-0.5 flex-shrink-0' />
                <span>{data?.customer_email}</span>
              </div>
              <div className='flex items-start gap-2 text-gray-500 text-sm'>
                <MapPin className='w-4 h-4 mt-0.5 flex-shrink-0' />
                <span>{data?.customer_address}</span>
              </div>
            </div>
          </div>

          {/* Worker Info */}
          <div className='space-y-3'>
            <div className='flex items-center gap-2 mb-3'>
              <Wrench className='w-5 h-5 text-gray-900' />
              <h3 className='text-gray-900 font-semibold'>Service Provider</h3>
            </div>
            <div className='space-y-2 pl-7'>
              <p>{data?.worker_name}</p>
              <p className='text-gray-500 text-sm'>{data?.worker_skills[0]}</p>
              <div className='flex items-start gap-2 text-gray-500 text-sm'>
                <Phone className='w-4 h-4 mt-0.5 flex-shrink-0' />
                <span>number baki</span>
              </div>
            </div>
          </div>
        </div>

        <hr className='my-3' />

        {/* Service Details */}
        <div className='mb-8'>
          <h3 className='mb-4 font-semibold text-gray-900'>Service Details</h3>
          <div className='bg-gray-100 p-4 rounded-lg space-y-2'>
            <div className='flex justify-between'>
              <span>Service Type:</span>
              <span>{data?.worker_skills[0]}</span>
            </div>
            <div className='flex justify-between'>
              <span>Duration:</span>
              <span>{data?.booking_duration}</span>
            </div>
            <div className='pt-2'>
              <span className='text-gray-500 text-sm'>Description:</span>
              <p className='mt-1 text-sm'>{data?.booking_description}</p>
            </div>
          </div>
        </div>

        <hr className='my-3' />

        {/* Charges Breakdown */}
        <div className='space-y-2'>
          <h3 className='font-semibold text-gray-900'>Charges Breakdown</h3>
          <div className='space-y-3'>
            <div className='flex justify-between py-1'>
              <span className='text-gray-500'>Service Charge</span>
              <span>₹{data?.price_service_fee.toFixed(2)}</span>
            </div>
            <div className='flex justify-between py-1'>
              <span className='text-gray-500'>Urgent Charge</span>
              <span>₹{data?.price_urgent_fee.toFixed(2)}</span>
            </div>
            <div className='flex justify-between py-1'>
              <span className='text-gray-500'>Material Fee</span>
              <span>₹{data?.price_service.toFixed(2)}</span>
            </div>
            <hr />
            <div className='flex justify-between py-1'>
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className='flex justify-between py-1'>
              <span className='text-gray-500'>Tax (10%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <hr />
            <div className='flex justify-between py-3 bg-gray-100 px-4 rounded-lg -mx-4'>
              <span className='text-gray-900 font-semibold'>Total Amount</span>
              <span className='text-gray-900 font-semibold'>
                ₹{total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        {paymentMethod && (
          <div className='mt-3'>
            <div className='flex items-center gap-2'>
              <span className='text-gray-500 text-sm'>Payment Method:</span>
              <span className='text-sm'>{paymentMethod}</span>
            </div>
          </div>
        )}

        {/* Notes */}
        {notes && (
          <>
            <hr className='my-3' />
            <div>
              <h4 className='mb-2 font-semibold text-gray-900'>Notes</h4>
              <p className='text-sm text-gray-500'>{notes}</p>
            </div>
          </>
        )}

        <hr className='mt-3' />

        {/* Footer */}
        <div className='text-center space-y-2'>
          <p className='text-sm text-gray-500'>
            Thank you for choosing ServicePro!
          </p>
          <p className='text-sm text-gray-500'>
            For any queries, please contact us at support@servicepro.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
