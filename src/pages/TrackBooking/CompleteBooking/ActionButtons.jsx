import React, { useRef } from 'react';
import { Download, Share2 } from 'lucide-react';
import Button from '../../../components/Button';
import IconButton from '../../../components/IconButton';
import Receipt from './Receipt';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';

const ActionButtons = ({ booking }) => {
  if (!booking) return null;
  const navigate = useNavigate();
  const receiptRef = useRef();

  const handleDownload = async () => {
    try {
      const receiptElement = receiptRef.current;

      const canvas = await html2canvas(receiptElement, {
        scale: 2,
        useCORS: false,
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const pxToMm = (px) => px * 0.264583;
      const imgWidth = pxToMm(canvas.width);
      const imgHeight = pxToMm(canvas.height);

      // Scale to fit page width
      const scale = pageWidth / imgWidth;
      const scaledWidth = imgWidth * scale;
      const scaledHeight = imgHeight * scale;

      const x = (pageWidth - scaledWidth) / 2;
      const y = 0;

      pdf.addImage(imgData, 'JPEG', x, y, scaledWidth, scaledHeight);
      pdf.save('receipt.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className='bg-white rounded-xl shadow p-6 flex flex-col gap-3'>
      {/* Download & Share */}
      <div className='flex flex-col gap-2'>
        <div ref={receiptRef} style={{ position: 'absolute', left: '-9999px' }}>
          <Receipt data={booking} />
        </div>

        <IconButton
          icon={Download}
          label='Download Receipt'
          className='w-full'
          onClick={handleDownload}
        />

        <IconButton icon={Share2} label='Share Experience' className='w-full' />
      </div>

      <Button
        label={'Book Another Service'}
        className='flex-1 w-full'
        // disabled={}
        onClick={() => navigate('/find-workers')}
      />

      <Button
        // type='submit'
        label={'Save as Preferred Worker'}
        className='flex-1 w-full'
      />
    </div>
  );
};

export default ActionButtons;
