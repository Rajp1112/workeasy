import React from "react";

const PaymentInfo = ({ payment }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Payment</h3>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-gray-600">Service Cost</span>
        <span className="font-medium">${payment?.serviceCost}</span>
      </div>
      <div className="flex justify-between font-semibold text-gray-900 text-base">
        <span>Total</span>
        <span>${payment?.total}</span>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Payment will be processed after work completion
      </p>
    </div>
  );
};

export default PaymentInfo;
