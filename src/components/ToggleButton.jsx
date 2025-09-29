import React, { useEffect, useState } from 'react';

export default function ToggleButton({
  options = ['Yes', 'No'],
  onChange,
  defaultValue,
}) {
  const [selected, setSelected] = useState(defaultValue || options[0]);

  useEffect(() => {
    setSelected(defaultValue || options[0]);
  }, [defaultValue, options]);

  const handleSelect = (option) => {
    setSelected(option);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div
      className={`relative grid grid-cols-${options.length} w-fit rounded-full bg-white border border-gray-900 font-bold cursor-pointer h-[31px] select-none`}
      style={{
        gridTemplateColumns: `repeat(${options.length}, 1fr)`,
      }}
    >
      {/* Moving highlight */}
      <span
        className='absolute h-[30px] rounded-full bg-gray-900 transition-all duration-300'
        style={{
          width: `${100 / options.length}%`,
          left: `${options.indexOf(selected) * (100 / options.length)}%`,
        }}
      ></span>

      {/* Options */}
      {options.map((option) => (
        <button
          key={option}
          type='button'
          onClick={() => handleSelect(option)}
          className={`px-3 text-center z-10 flex items-center justify-center transition-colors duration-300 text-sm ${
            selected === option ? 'text-white' : 'text-gray-900'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
