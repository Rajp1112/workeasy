import React from "react";
import { useNavigate } from "react-router-dom";
import { Phone, MessageSquare, Calendar } from "lucide-react"; 
import IconButton from "../../../components/IconButton";
const Sidebar = ({ worker }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl p-8 shadow flex flex-col items-center gap-4 h-fit">
      {/* Hourly Rate */}
      <p className="text-2xl font-semibold mb-2 text-center">
        ${worker.hour_rate}
        <span className="text-base font-medium text-gray-500">/hour</span>
      </p>

      {/* Action Buttons */}
      <IconButton
        icon={Calendar}
        label="Book Now"
        onClick={() => navigate("/book-worker/" + worker._id, { state: { worker } })}
        className="w-full"
      />
      <IconButton
        icon={MessageSquare}
        label="Send Message"
        // onClick={() => navigate("/messages")}
        className="w-full border bg-white !text-gray-900 hover:!bg-gray-900 hover:!text-white !border-gray-900"
      />
      <IconButton
        icon={Phone}
        label="Call Now"
        // onClick={() => navigate("/call")}
        className="w-full border bg-white !text-gray-900 hover:!bg-gray-900 hover:!text-white !border-gray-900"
      />

      {/* Worker Info */}
      <div className="mt-6 text-sm text-gray-600 flex flex-col gap-2 w-full">
        <div className="flex justify-between">
          <span>Response time:</span>
          <span className="font-medium text-gray-900">{worker.responseTime} 30 Min</span>
        </div>
        <div className="flex justify-between">
          <span>Completed jobs:</span>
          <span className="font-medium text-gray-900">{worker.jobs} 340</span>
        </div>
        <div className="flex justify-between">
          <span>Experience:</span>
          <span className="font-medium text-gray-900">{worker.experience}</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
