import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown } from "react-icons/io";

const CustomSelect = ({
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValue, setSelectedValue] = useState(value || '');
  const wrapperRef = useRef(null);

  // Close on outside click or scroll
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => setIsOpen(false);

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (option) => {
    setSelectedValue(option);
    onChange(option);
    setIsOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setSelectedValue('');
    setSearchTerm('');
    onChange('');
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div ref={wrapperRef} className={`relative w-full sm:w-auto ${className}`}>
      <div
        className={`
          p-2 rounded-lg border bg-white cursor-pointer flex items-center justify-between
          border-gray-300
          ${isOpen ? 'border-gray-900' : 'hover:border-gray-900'}
        `}
        onClick={handleToggle}
      >
        <span className={`text-gray-700 ${!selectedValue ? 'text-gray-400' : ''}`}>
          {selectedValue || placeholder}
        </span>
        <div className="flex items-center gap-2">
          {selectedValue && (
            <button
              type="button"
              className="text-gray-400"
              onClick={handleClear}
            >
              ✕
            </button>
          )}
          {/* arrow that rotates */}
          <IoIosArrowDown
            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full p-2 border-b border-gray-300 focus:outline-none"
          />
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option}
                className={`p-2 cursor-pointer ${
                  selectedValue === option ? 'bg-gray-200' : 'hover:bg-gray-100'
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No options found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
