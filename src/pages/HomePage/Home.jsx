import React, { useState } from 'react';
import Navbar from './Navbar';
import HeroImage from '../../assets/herosideimage.jpg'; 
import PopularServices from './PopularServices';
import HowItWork from './HowItWork';
import FeaturedWorkers from './FeaturedWorkers';
import WhatOurCustomerSay from './WhatOurCustomersSay';
import Footer from './Footer';
import CustomInput from '../../components/CustomInput';
import { MapPin, Search, User } from 'lucide-react';

const Home = () => {
const [name, setName] = useState('');
const [location, setLocation] = useState('');
  // const handleChange = (e) => {
  //   setName(e.target.value);
  //   setLocation(e.target.value);
  // };
  return (
    <>
   
    <div className="min-h-[92vh] flex flex-col">


      <div className="flex flex-col flex-1 md:flex-row items-center justify-between px-8 bg-blue-100 gap-8 py-16">
        {/* Left Side - Text */}
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-5xl font-bold mb-4 text-gray-800">
            Find Trusted Workers
          </h1>
          <h1 className="text-5xl font-bold mb-4 text-gray-800">
             Near You
          </h1>
          <p className="text-lg mb-8 text-gray-600">
            Connect with skilled professionals for all your home service needs. From plumbing to painting, find the right expert in minutes.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            
            <CustomInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              icon={User}
              type="text"
            />
            <CustomInput
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your location"
              icon={MapPin}
              type="text"
            />
           
             <button className="bg-gray-900 text-white px-4 py-3 rounded-lg flex items-center justify-center">
    <Search className="h-5 w-5" />
  </button>
          </div>

          <button className="bg-gray-900 text-white px-6 py-3 rounded-lg">
            Hire Now →
          </button>
          
        </div>

        {/* Right Side - Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={HeroImage}
            alt="Workers"
            className="rounded-xl shadow-lg max-w-full h-auto"
            />
        </div>
      </div>
      
            </div>  
      <PopularServices />
      <HowItWork />
      <FeaturedWorkers />
      <WhatOurCustomerSay />
      
    </>
  );
};

export default Home;
