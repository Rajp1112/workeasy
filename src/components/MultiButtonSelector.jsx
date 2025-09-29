import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

// Reusable button selector
export const MultiButtonSelector = ({ name, control, options, valueKey = "key", labelKey = "name", defaultSelected }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultSelected || []}
      render={({ field: { value, onChange } }) => (
        <div className="flex gap-2 flex-wrap">
          {options.map((opt) => {
            const key = opt[valueKey];
            const label = opt[labelKey];
            const isSelected = value.includes(key);

            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  if (isSelected) {
                    onChange(value.filter((item) => item !== key));
                  } else {
                    onChange([...value, key]);
                  }
                }}
                className={`px-4 py-2 rounded-md border transition
                  ${isSelected ? "bg-green-100 border-green-500 text-green-700"
                               : "bg-white border-gray-300 text-gray-700"}`}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
    />
  );
};
