import React from 'react';
import Button from '../../components/Button';
import { Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WorkerCard = ({ worker }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    // if (worker.available) {
    navigate(`/book-worker/${worker._id}`, { state: { worker } });
    // }
  };

  const handleViewProfile = () => {
    navigate(`/worker-profile/${worker._id}`, { state: { worker } });
  };

  return (
    <div className='bg-white p-6 rounded-xl shadow hover:shadow-lg transition w-full '>
      <div className='flex gap-4'>
        <img
          src={worker?.profileImage}
          alt='Not'
          className='w-16 h-16 rounded-full object-cover'
        />
        <div className='flex-1'>
          <div className='flex justify-between items-start'>
            <div>
              <h3 className='font-semibold text-lg'>
                {worker?.first_name} {worker?.last_name}
              </h3>
              <span className='px-2 py-0.5 rounded bg-gray-100 text-xs font-medium inline-block mb-1'>
                {worker?.skills[0]}
              </span>
            </div>
            <div className='text-right'>
              <p className='text-lg text-gray-900 font-semibold'>
                {worker?.hour_rate}/hr
              </p>
              {worker?.available ? (
                <span className='text-xs px-2 py-0.5 rounded bg-green-100 text-green-700 font-medium inline-block mt-1'>
                  Available
                </span>
              ) : (
                <span className='text-xs px-2 py-0.5 rounded bg-red-100 text-red-700 font-medium inline-block mt-1'>
                  Busy
                </span>
              )}
            </div>
          </div>

          <p className='text-sm text-yellow-500 flex items-center gap-1 mt-1'>
            <span className='font-bold'>★</span>
            {worker?.averageRating}{' '}
            <span className='text-gray-600'>
              ({worker?.reviews.length} reviews)
            </span>
          </p>

          <div className='text-sm text-gray-500 mt-1 flex items-center gap-2'>
            <div className='flex items-center gap-1'>
              <MapPin size={16} /> <span>{worker?.city}</span>
            </div>
            <span className='flex items-center gap-1'>
              <Clock size={16} />
              Responds in {worker?.responseTime || '1 hr'}
            </span>
          </div>

          <div className='flex gap-2 mt-2 flex-wrap'>
            {worker.skills?.map((spec) => (
              <span
                key={spec}
                className='text-xs border px-2 py-1 rounded bg-gray-50'
              >
                {spec}
              </span>
            ))}
          </div>

          <div className='flex gap-2 mt-4'>
            <Button
              label={worker.available ? 'Book Now' : 'Busy'}
              className='flex-1'
              disabled={!worker.available}
              onClick={handleBookNow}
            />
            <Button
              label='View Profile'
              className='flex-1 border bg-white !text-gray-900 hover:!bg-gray-900 hover:!text-white !border-gray-900'
              onClick={handleViewProfile}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerCard;
