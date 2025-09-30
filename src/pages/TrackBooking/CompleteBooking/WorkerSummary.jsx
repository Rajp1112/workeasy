import React from 'react';
import { Star } from 'lucide-react';

const WorkerSummary = ({ booking }) => {
  const worker = {
    name: booking.worker_name,
    skills: booking.worker_skills,
    image: '/avatar.jpg',
    rating: 4.9,
    reviews: 127,
  };
  return (
    <div className='bg-white rounded-xl shadow p-6 flex gap-4 items-center'>
      <img
        src={worker.image}
        alt='Worker'
        className='w-16 h-16 rounded-full object-cover'
      />
      <div>
        <h3 className='font-semibold text-gray-900'>{worker.name}</h3>
        <p className='text-sm text-gray-500 mb-1'>{worker.skills}</p>
        <div className='flex items-center gap-1 text-sm text-gray-600'>
          <Star size={16} className='text-yellow-400' />
          <span>
            {worker.rating} ({worker.reviews} reviews)
          </span>
        </div>
      </div>
    </div>
  );
};

export default WorkerSummary;
