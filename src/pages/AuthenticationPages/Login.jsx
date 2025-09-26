import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button as MUIButton } from '@mui/material';
import CommonInput from '../../components/CommonInput';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/auth/authSlice';
import { useToast } from '../../components/ToastProvider';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaApple } from 'react-icons/fa';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [registerType, setRegisterType] = useState('customer');
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(loginUser(data))
      .then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          showToast('success', 'Login Successful');
          navigate('/');
        } else {
          showToast('error', res.payload || 'Invalid credentials');
        }
      })
      .catch((err) => {
        console.error('Login failed:', err);
        showToast('error', 'Something went wrong');
      });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
      <div className='w-full max-w-md bg-white p-6 rounded-lg shadow-lg'>
        {/* Back Button */}
        <div
          className='flex items-center gap-2 group cursor-pointer mb-4'
          onClick={handleBack}
        >
          <div
            className='relative flex items-center gap-2 pb-1
            after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-black
            after:transition-all after:duration-300 group-hover:after:w-full'
          >
            <IoIosArrowRoundBack className='text-black text-xl' />
            <span className='text-black'>Back</span>
          </div>
        </div>

        <h2 className='text-2xl font-bold text-center mb-2 text-gray-900'>
          Login
        </h2>
        <p className='text-sm text-gray-600 text-center mb-6'>
          Please fill in the details below to complete your login.
        </p>

        <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
          <CommonInput
            name='email'
            placeholder='Email'
            type='text'
            register={register}
          />
          <CommonInput
            name='password'
            placeholder='Password'
            type='password'
            register={register}
          />
          <div className='flex justify-end mt-4'>
            <MUIButton variant='contained' type='submit'>
              Login
            </MUIButton>
          </div>
        </form>

        {/* Register Link */}
        <div className='mt-6 text-center text-sm text-gray-700'>
          Don't have an account?{' '}
          <Link to='/register' className='text-blue-600 underline'>
            Register
          </Link>
        </div>

        {/* Social Login */}
        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600 mb-2'>Or continue with</p>
          <div className='flex justify-center space-x-4'>
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

export default Login;
