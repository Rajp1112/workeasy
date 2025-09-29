import React from "react";
import { Star } from "lucide-react";
import { Phone, MessageSquare } from "lucide-react";

const WorkerDetails = ({ worker }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          src={worker?.avatar || "https://via.placeholder.com/60"}
          alt={worker?.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-gray-900">{worker?.name}</p>
          <span className="inline-block text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
            {worker?.role || "Worker"}
          </span>
          <div className="flex items-center gap-1 mt-1 text-yellow-500">
            <Star size={16} fill="currentColor" />
            <span className="text-sm text-gray-700">{worker?.rating} ({worker?.reviews} reviews)</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <button className="border p-2 rounded-lg hover:bg-gray-50">
          <Phone size={18} />
        </button>
        <button className="border p-2 rounded-lg hover:bg-gray-50">
          <MessageSquare size={18} />
        </button>
      </div>
    </div>
  );
};

export default WorkerDetails;
