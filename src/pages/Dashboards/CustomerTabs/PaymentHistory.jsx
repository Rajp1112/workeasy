import React from 'react';
import { CreditCardIcon } from 'lucide-react'; // Lucid icons
import { FaPaypal, FaCheckCircle } from 'react-icons/fa'; // React icons for PayPal and CheckCircle

const PaymentHistory = () => {
  const payments = [
    {
      id: 1,
      description: 'Cabinet Installation',
      date: '2024-01-10',
      amount: 450,
      paymentMethod: 'Credit Card',
      status: 'Paid',
    },
    {
      id: 2,
      description: 'Room Painting',
      date: '2024-01-05',
      amount: 320,
      paymentMethod: 'Credit Card',
      status: 'Paid',
    },
    {
      id: 3,
      description: 'Deep Cleaning',
      date: '2023-12-28',
      amount: 150,
      paymentMethod: 'PayPal',
      status: 'Paid',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Payment History</h1>
      <div className="space-y-4">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
          >
            <div className="flex items-center">
              {payment.paymentMethod === 'Credit Card' ? (
                <CreditCardIcon className="w-6 h-6 text-blue-500 mr-3" />
              ) : (
                <FaPaypal className="w-6 h-6 text-blue-600 mr-3" />
              )}
              <div>
                <h3 className="text-lg font-semibold">{payment.description}</h3>
                <p className="text-sm text-gray-500">{payment.date}</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-xl font-semibold text-gray-900">${payment.amount}</span>
              <FaCheckCircle className="w-5 h-5 text-green-500 ml-3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
