import React from 'react';
import { Download, Share2 } from 'lucide-react';
import Button from '../../../components/Button';
import IconButton from '../../../components/IconButton';

const ActionButtons = ({ booking }) => {
  if (!booking) return null;

  return (
    <div className='bg-white rounded-xl shadow p-6 flex flex-col gap-3'>
      {/* Download & Share */}
      <div className='flex flex-col gap-2'>
        <IconButton
          icon={Download}
          label='Download Receipt'
          className='w-full'
        />

        <IconButton icon={Share2} label='Share Experience' className='w-full' />
      </div>

      <Button
        // type='submit'
        label={'Book Another Service'}
        className='flex-1 w-full'
        // disabled={}
      />

      <Button
        label={'Go to Dashboard'}
        className='flex-1 w-full'
        // disabled={}
      />
      {/* Save Worker */}
      <Button
        // type='submit'
        label={'Save as Preferred Worker'}
        className='flex-1 w-full'
        // disabled={}
      />
    </div>
  );
};

export default ActionButtons;
