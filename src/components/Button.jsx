import React from "react";

const Button = ({ label, className = "", onClick, ...props }) => {
  const baseClasses =
    "inline-flex justify-center items-center rounded-md px-4 py-2 font-medium border transition-colors";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} bg-gray-900 text-white hover:bg-white hover:text-gray-900 hover:border-gray-900 ${className}`}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
