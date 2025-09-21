import React from 'react';

import ProfileHeader from './ProfileHeader';
import TabsSection from './TabsSection';
import Sidebar from './Sidebar';
import { IoIosArrowRoundBack } from "react-icons/io";
import IconButton from '../../../components/IconButton';

import { useLocation, useNavigate } from 'react-router-dom';

const WorkerProfile = () => {
  const navigate = useNavigate();
    const location = useLocation();

  const worker = location.state?.worker;

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center gap-8">
      <div className="w-full max-w-5xl items-start">

   <IconButton
      icon={IoIosArrowRoundBack}
      label="Back to Search"
      onClick={() => {  navigate("/find-workers"); }}
      />
      </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
      {/* Left & middle section */}
      <div className="col-span-2 flex flex-col gap-4">
        <ProfileHeader worker={worker} skills={worker.skills} />
        <TabsSection worker={worker} />
      </div>
      {/* Right section */}
      <Sidebar worker={worker} />
    </div>
  </div>
);  
};

export default WorkerProfile;
