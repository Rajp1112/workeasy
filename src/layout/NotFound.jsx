import React from "react";
import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4">
      <XCircle size={80} className="text-red-500 mb-6" />
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6 text-center">
        Oops! The page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-200 transition"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
