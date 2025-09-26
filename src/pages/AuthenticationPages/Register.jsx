import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Stepper, Step, StepLabel, Button as MUIButton } from '@mui/material';
import CommonInput from '../../components/CommonInput';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../features/auth/authSlice';
import { useToast } from '../../components/ToastProvider';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { FaApple, FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const stepLabels = {
  customer: ['Personal Info', 'Address'],
  worker: ['Personal Info', 'Address', 'Professional Info', 'Additional Info'],
};

const stepFields = {
  customer: [
    [
      { name: 'first_name', type: 'text' },
      { name: 'last_name', type: 'text' },
      { name: 'email', type: 'text' },
      { name: 'password', type: 'password' },
    ],
    [
      { name: 'phone', type: 'text' },
      { name: 'address', type: 'text' },
      { name: 'city', type: 'text' },
      { name: 'postal_code', type: 'text' },
    ],
  ],
  worker: [
    [
      { name: 'first_name', type: 'text' },
      { name: 'last_name', type: 'text' },
      { name: 'email', type: 'text' },
      { name: 'password', type: 'password' },
    ],
    [
      { name: 'phone', type: 'text' },
      { name: 'address', type: 'text' },
      { name: 'city', type: 'text' },
      { name: 'postal_code', type: 'text' },
    ],
    [
      {
        name: 'skills',
        type: 'select',
        options: ['Plumbing', 'Electrician', 'Carpenter'],
      },
      { name: 'experience', type: 'text' },
      { name: 'hour_rate', type: 'text' },
      { name: 'bio', type: 'text' },
    ],
    [
      { name: 'profileImage', type: 'file' },
      { name: 'available', type: 'select', options: ['true', 'false'] },
    ],
  ],
};

const Register = () => {
  const [registerType, setRegisterType] = useState('customer');
  const [activeStep, setActiveStep] = useState(0);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (activeStep < stepLabels[registerType].length - 1) {
      setActiveStep(activeStep + 1);
      return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, val]) => {
      if (key === 'profileImage' && val?.[0]) {
        formData.append('profileImage', val[0]);
      } else {
        formData.append(key, val);
      }
    });
    formData.append('role', registerType);

    dispatch(registerUser(formData))
      .then((res) => {
        if (res?.error?.message === 'Rejected') {
          showToast('warning', res?.payload);
        } else {
          reset();
          showToast('success', 'Registration Successful');
          setActiveStep(0);
          navigate('/login');
        }
      })
      .catch((err) => {
        console.error('Registration failed:', err);
      });
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  const switchRegisterType = () => {
    setRegisterType(registerType === 'customer' ? 'worker' : 'customer');
    setActiveStep(0);
    reset();
  };

  const renderStepFields = () =>
    stepFields[registerType][activeStep].map((field) => (
      <CommonInput
        key={field.name}
        name={field.name}
        placeholder={field.name.charAt(0).toUpperCase() + field.name.slice(1)}
        type={field.type}
        options={field.options || []}
        register={register}
      />
    ));

  return (
    <div className='min-h-screen flex items-center flex-wrap justify-center bg-gray-100 p-4'>
      {/* <div className='w-full max-w-xl bg-white p-6 rounded-lg shadow-lg'>
        <img src={sideImage} alt='' />
        
      </div> */}

      <div className='w-full max-w-xl bg-white p-6 rounded-lg shadow-lg'>
        {/* Back Button */}
        <div className='flex items-center gap-2 group cursor-pointer mb-4'>
          <div
            className='relative flex items-center gap-2 pb-1
              after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black
              after:transition-all after:duration-300 group-hover:after:w-full'
            onClick={() => navigate('/')}
          >
            <IoIosArrowRoundBack className='text-black text-xl' />
            <span className='text-black'>Back</span>
          </div>
        </div>

        <h2 className='text-2xl font-semibold text-center mb-4 text-gray-900'>
          {`Register as ${registerType === 'customer' ? 'Customer' : 'Worker'}`}
        </h2>

        <Stepper activeStep={activeStep} alternativeLabel>
          {stepLabels[registerType].map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={handleSubmit(onSubmit)} className='mt-6 space-y-4'>
          {renderStepFields()}

          <div className='flex justify-between mt-4'>
            <MUIButton
              variant='outlined'
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              Back
            </MUIButton>
            <MUIButton variant='contained' type='submit'>
              {activeStep === stepLabels[registerType].length - 1
                ? 'Submit'
                : 'Next'}
            </MUIButton>
          </div>
        </form>

        {/* Switch Registration Type */}
        <div className='mt-6 text-center'>
          <button
            type='button'
            onClick={switchRegisterType}
            className='relative text-gray-900 pb-1 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-gray-900 after:transition-all after:duration-300 hover:after:w-full'
          >
            {`Switch to ${
              registerType === 'customer' ? 'Worker' : 'Customer'
            } Registration`}
          </button>
        </div>

        {/* Login Link & Social Icons */}
        <div className='mt-6 text-center text-sm text-gray-700'>
          Already have an account?{' '}
          <Link to='/login' className='text-blue-600 underline'>
            Login
          </Link>
          <div className='mt-4'>Or continue with</div>
          <div className='flex justify-center space-x-4 mt-2'>
            <FcGoogle
              size={24}
              className='cursor-pointer hover:scale-110 transition-transform'
            />
            <FaFacebook
              size={24}
              color='#1877F2'
              className='cursor-pointer hover:scale-110 transition-transform'
            />
            <FaApple
              size={24}
              className='cursor-pointer hover:scale-110 transition-transform'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
