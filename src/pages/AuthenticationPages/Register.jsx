import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Stepper, Step, StepLabel, Button as MUIButton } from '@mui/material';
import CommonInput from '../../components/CommonInput';

// Images
import customerStep1 from '../../assets/registration.jpg';
import customerStep2 from '../../assets/registration.jpg';
import workerStep1 from '../../assets/registration.jpg';
import workerStep2 from '../../assets/registration.jpg';
import workerStep3 from '../../assets/registration.jpg';
import workerStep4 from '../../assets/registration.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { Hammer, UserPlus } from 'lucide-react';
import IconButton from '../../components/IconButton';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../features/auth/authSlice';
import { useToast } from '../../components/ToastProvider';

// Steps and fields
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

const stepImages = {
  customer: [customerStep1, customerStep2],
  worker: [workerStep1, workerStep2, workerStep3, workerStep4],
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
        console.log(res);

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
    <div className='flex flex-col min-h-screen'>
      <nav className='bg-white border-b border-gray-200 sticky top-0 z-50 shadow-lg'>
        <div className=' mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            {/* Logo */}
            <Link to='/' className='flex items-center space-x-2 cursor-pointer'>
              <div className='bg-gray-900 text-white p-2 rounded-lg'>
                <Hammer className='h-6 w-6' />
              </div>
              <span className='font-bold text-lg'>WorkerFinder</span>
            </Link>

            <div className='hidden md:flex items-center space-x-4 flex-col text-center'>
              <h2 className='text-2xl font-semibold'>
                {`Register as ${
                  registerType === 'customer' ? 'Customer' : 'Worker'
                }`}
              </h2>
              <p className='text-gray-600 mt-1'>
                Please fill in the details below to complete your registration.
              </p>
            </div>

            <div className='flex items-center space-x-3'>
              <IconButton
                icon={UserPlus}
                label={`Register to ${
                  registerType === 'customer' ? 'Worker' : 'Customer'
                }`}
                variant=''
                onClick={switchRegisterType}
              />
            </div>
          </div>
        </div>
      </nav>
      {/* Stepper */}
      <div className='px-5 py-5 bg-gray-50'>
        <Stepper activeStep={activeStep} alternativeLabel>
          {stepLabels[registerType].map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      {/* Content */}
      <div className='flex flex-1'>
        {/* Left Image */}
        <div
          className='flex-1'
          style={{
            backgroundImage: `url(${stepImages[registerType][activeStep]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '500px',
          }}
        />

        {/* Right Form */}
        <div
          // key={`${registerType}-${activeStep}`} // remount form for layout refresh
          className='flex-1 flex items-center justify-center p-8'
        >
          <form className='w-full max-w-md' onSubmit={handleSubmit(onSubmit)}>
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
        </div>
      </div>
    </div>
  );
};

export default Register;
