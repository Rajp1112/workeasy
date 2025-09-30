import React, { useState } from 'react';
import {
  TextField,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const CommonInput = ({
  type = 'text',
  placeholder,
  register,
  name,
  options = [],
  multiline = false,
  value,
  onChange,
  checked,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => setShowPassword(!showPassword);

  if (type === 'password') {
    return (
      <TextField
        {...register(name)}
        label={placeholder}
        type={showPassword ? 'text' : 'password'}
        fullWidth
        margin='normal'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={handleTogglePassword} edge='end'>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  }

  if (type === 'select') {
    return (
      <FormControl fullWidth margin='normal'>
        <InputLabel>{placeholder}</InputLabel>
        <Select {...register(name)} label={placeholder}>
          {options.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
  if (type === 'checkbox') {
    return (
      <FormControl margin='normal'>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input
            type='checkbox'
            {...register(name)}
            checked={checked}
            onChange={onChange}
          />
          {placeholder}
        </label>
      </FormControl>
    );
  }
  if (type === 'file') {
    return (
      <TextField
        {...register(name)}
        type='file'
        fullWidth
        margin='normal'
        label={placeholder}
      />
    );
  }

  return (
    <TextField
      {...register(name)}
      label={placeholder}
      fullWidth
      margin='normal'
    />
  );
};

export default CommonInput;
