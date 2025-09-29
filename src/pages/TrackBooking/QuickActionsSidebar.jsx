import React from "react";
import { MessageSquare, Phone, Camera } from "lucide-react";

const QuickActionsSidebar = ({ worker }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Quick Actions</h3>
      <button className="flex items-center gap-2 border border-gray-300 py-2 px-3 rounded-lg hover:bg-gray-50">
        <MessageSquare size={18} /> Send Message
      </button>
      <button className="flex items-center gap-2 border border-gray-300 py-2 px-3 rounded-lg hover:bg-gray-50">
        <Phone size={18} /> Call Worker
      </button>
      <button className="flex items-center gap-2 border border-gray-300 py-2 px-3 rounded-lg hover:bg-gray-50">
        <Camera size={18} /> Share Photos
      </button>
    </div>
  );
};

export default QuickActionsSidebar;
