import React from 'react';
import { CheckCircle } from 'lucide-react';

const CompletionHeader = () => {
  return (
    <div className='  p-4 text-center flex flex-col items-center'>
      <CheckCircle size={40} className='text-green-500 mb-2' />
      <h2 className='text-xl font-semibold text-gray-900 mb-1'>
        Work Completed!
      </h2>
      <p className='text-sm text-gray-500'>
        Your service has been successfully completed
      </p>
    </div>
  );
};

export default CompletionHeader;
