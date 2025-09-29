import React from 'react';
import {
  Star,
  Briefcase,
  Clock,
  MapPin,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { getImageUrl } from '../../../helper';

const ProfileHeader = ({ worker, skills }) => {
  const profileImageUrl = getImageUrl(worker?.profileImage);

  return (
    <div className='flex flex-col gap-6'>
      {/* Top section with image + basic info */}
      <div className='flex items-center gap-6'>
        <img
          src={profileImageUrl}
          alt={worker?.first_name}
          className='w-28 h-28 rounded-full object-cover border-2 border-gray-200'
        />

        <div className='flex flex-col gap-2'>
          {/* Name + verified badge */}
          <div className='flex items-center gap-2'>
            <span className='text-xl font-semibold'>
              {worker?.first_name} {worker?.last_name}
            </span>
            {worker?.verified && (
              <span className='text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center gap-1'>
                <ShieldCheck size={14} className='text-blue-600' />
                Verified
              </span>
            )}
          </div>

          {/* Skill badge */}
          {worker?.skills && (
            <span className='text-sm bg-gray-100 px-2 py-1 rounded font-medium inline-block w-fit'>
              {worker.skills}
            </span>
          )}

          {/* Stats row */}
          <div className='flex flex-wrap items-center gap-8 mt-2 text-sm'>
            <div className='flex  gap-1 flex-col'>
              <span className='flex items-center text-gray-900 font-semibold'>
                <Star size={16} className='text-yellow-500 mr-1' />
                {worker.averageRating}
              </span>
              <span className='text-gray-600 ml-1'>
                ({worker?.reviews.length} reviews)
              </span>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='flex items-center text-gray-900 gap-1 font-semibold'>
                <Award size={16} className='text-blue-600' />
                <span className='text-gray-900 '>{worker?.awards} 340</span>
              </span>

              <span className='flex items-center text-gray-600 gap-1'>
                <Briefcase size={16} /> {worker?.jobs} Jobs completed
              </span>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='flex  text-green-600 gap-1'>
                <Clock size={16} />
                <span className='text-gray-900 font-semibold'>
                  {worker.lastActive} 10 Min
                </span>
              </span>
              <span className='flex items-center text-gray-600 gap-1'>
                {worker.responseTime} Response time
              </span>
            </div>
            <div className='flex flex-col gap-1'>
              <span className='flex items-center text-gray-900 font-semibold gap-1'>
                <MapPin size={16} /> {worker?.city}
              </span>
              <span className='flex items-center text-gray-600 gap-1'>
                location
              </span>
            </div>
          </div>
          {skills?.length > 0 && (
            <div className='flex flex-wrap gap-2 mt-3'>
              {skills.map((spec) => (
                <span
                  key={spec}
                  className='text-xs border px-2 py-1 rounded bg-gray-50 font-medium'
                >
                  {spec}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Skills section below */}
    </div>
  );
};

export default ProfileHeader;
