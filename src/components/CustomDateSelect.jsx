import React from "react";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const CustomDateSelect = ({ value, onChange, placeholder = "Select a date", className = "" }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={`w-full sm:w-auto ${className}`}>
        <DatePicker
          value={value}
          onChange={onChange}
          inputFormat="DD/MM/YYYY"
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              variant="outlined"
              placeholder={placeholder}
              size="small"             
            />
          )}
        />
      </div>
    </LocalizationProvider>
  );
};

export default CustomDateSelect;
