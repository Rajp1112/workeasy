import React, { useState } from 'react';
import AboutContent from './AboutContent';
import ReviewsContent from './ReviewsContent';
import PortfolioContent from './PortfolioContent';
import AvailabilityContent from './AvailabilityContent';

const TabsSection = ({ worker }) => {
  const [activeTab, setActiveTab] = useState('About');

  const renderContent = () => {
    switch (activeTab) {
      case 'About':
        return <AboutContent worker={worker} />;
      case 'Reviews':
        return <ReviewsContent worker={worker} />;
      case 'Portfolio':
        return <PortfolioContent worker={worker} />;
      case 'Availability':
        return <AvailabilityContent worker={worker} />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-6">
      {/* Tab buttons */}
      <div className="flex gap-2 border-b">
        {['About', 'Reviews', 'Portfolio', 'Availability'].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-6 rounded-t-lg font-medium ${
              activeTab === tab ? 'bg-white border-b-2 border-gray-900' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(tab)} 
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-b-xl p-4 shadow mt-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default TabsSection;
