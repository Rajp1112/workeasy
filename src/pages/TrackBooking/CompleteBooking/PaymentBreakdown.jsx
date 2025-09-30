import React from 'react';

const PaymentBreakdown = ({ booking }) => {
  if (!booking) return null;

  const tipOptions = ['No Tip', 5, 10, 15, 20];

  return (
    <div className='bg-white rounded-xl shadow p-6'>
      <h3 className='text-lg font-semibold text-gray-900 mb-4'>
        Payment Summary
      </h3>

      <div className='text-sm text-gray-700 space-y-2'>
        <div className='flex justify-between'>
          <span>Service Cost</span>
          <span className='font-semibold'>${booking.price_service}</span>
        </div>
        <div className='flex justify-between'>
          <span>Service Fee</span>
          <span>${booking.price_service_fee}</span>
        </div>
        {booking.price_urgent_fee > 0 && (
          <div className='flex justify-between'>
            <span>Urgent Fee</span>
            <span>${booking.price_urgent_fee}</span>
          </div>
        )}
        <div className='flex justify-between font-bold pt-2 border-t'>
          <span>Total</span>
          <span>${booking.price_total}</span>
        </div>
      </div>

      {/* Tip Options */}
      <div className='mt-4 flex gap-2 flex-wrap'>
        {tipOptions.map((tip, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded text-sm ${
              tip === 'No Tip' ? 'bg-gray-200' : 'bg-blue-100'
            }`}
          >
            {typeof tip === 'number' ? `$${tip}` : tip}
          </button>
        ))}
      </div>

      {/* Payment Status */}
      <div className='bg-green-100 text-green-700 px-2 py-1 rounded text-xs mt-4'>
        Payment Processed Successfully
      </div>
    </div>
  );
};

export default PaymentBreakdown;
