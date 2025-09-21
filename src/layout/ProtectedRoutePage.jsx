import React from "react";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

const ProtectedRoutePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <Lock size={80} className="text-yellow-400 mb-6" />
      <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
      <p className="text-lg mb-6 text-center">
        You must be logged in to view this page.
      </p>
      <button
        onClick={() => navigate("/login")}
        className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-200 transition"
      >
        Go To Login
      </button>
    </div>
  );
};

export default ProtectedRoutePage;
