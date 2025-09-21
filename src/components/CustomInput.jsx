import React from "react";

const CustomInput = ({
  value,
  onChange,
  placeholder,
  type = "text",
  icon: Icon,
  asTextarea = false, // new prop
  rows = 3,           // for textarea height
}) => {
  return (
    <div className="
      flex items-center rounded-lg p-3 bg-white w-full
      border border-gray-300
      hover:border-gray-900
      focus-within:border-gray-900
      transition-colors duration-200
    ">
      {Icon && <Icon className="h-5 w-5 text-gray-500 mr-2" />}
      
      {asTextarea ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className="flex-1 outline-none text-gray-700 resize-none"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 outline-none text-gray-700"
        />
      )}
    </div>
  );
};

export default CustomInput;
