import React, { useState } from 'react';
import { FaRegStar } from 'react-icons/fa';
import CommonInput from '../../../components/CommonInput';
import { useForm } from 'react-hook-form';
import { createReview } from '../../../features/review/reviewSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../components/ToastProvider';
import Button from '../../../components/Button';

const ReviewForm = ({ booking }) => {
  const { register, handleSubmit } = useForm();
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const navigate = useNavigate();
  const onSubmit = (data) => {
    const storedData = {
      ...data,
      rating,
    };

    if (rating === 0) {
      showToast('info', 'Please select a star rating before submitting.');
      return;
    }

    dispatch(
      createReview({
        booking_id: booking._id,
        worker_id: booking.worker_id,
        customer_id: booking.customer_id,
        rating: rating,
        comment: data.review,
      })
    )
      .then((res) => {
        if (res?.payload?.review) {
          showToast('success', res.payload.message);
          navigate(`/customer-dashboard/${booking._id}`);
        }
      })
      .catch((err) => {
        showToast(
          'error',
          'Something went wrong while submitting your review.'
        );
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-white rounded-xl shadow p-6'
    >
      <h3 className='text-lg font-semibold text-gray-900 mb-4'>
        Rate Your Experience
      </h3>

      {/* Star Rating */}
      <div className='flex gap-2 mb-4'>
        {[1, 2, 3, 4, 5].map((star) => (
          <FaRegStar
            key={star}
            size={28}
            className={
              star <= rating
                ? 'text-yellow-400'
                : 'text-gray-300 cursor-pointer'
            }
            onClick={() => setRating(star)}
          />
        ))}
      </div>

      {/* Review Text */}
      <CommonInput
        type='text'
        placeholder='Share details about your experience'
        name='review'
        register={register}
        multiline={true}
      />

      {/* Recommend Checkbox */}
      <div className='flex items-center'>
        <CommonInput
          type='checkbox'
          placeholder='I would recommend this worker to others'
          name='recommend'
          register={register}
        />
      </div>

      {/* Photo Upload */}

      <div className='pb-4'>
        <label className='text-gray-900'>
          Add Photos
          <CommonInput
            type='file'
            placeholder='Add Photos'
            name='photos'
            register={register}
          />
        </label>
      </div>
      <Button type='submit' label={'Submit Review'} className='flex-1 w-full' />
    </form>
  );
};

export default ReviewForm;
