import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Calendar,
  MapPin,
  ShieldCheck,
  Star,
  Timer,
  CreditCard,
} from "lucide-react";
import { FaUser } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import IconButton from "../../../components/IconButton";
import { useNavigate } from "react-router-dom";
import CustomSelect from "../../../components/CustomSelect";
import CustomDateSelect from "../../../components/CustomDateSelect";
import CustomInput from "../../../components/CustomInput";

const BookService = ({ workerData }) => {
  const navigate = useNavigate();
  const urgentFee = 20;

  // Price from backend (or default values)
  const [servicePrice, setServicePrice] = useState(90);
  const [serviceFee, setServiceFee] = useState(100);

  useEffect(() => {
    if (workerData) {
      setServicePrice(workerData.servicePrice || 90);
      setServiceFee(workerData.serviceFee || 100);
    }
  }, [workerData]);

  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      selectedDate: null,
      selectedTime: "",
      selectedDuration: "",
      address: "",
      jobDescription: "",
      isUrgent: false,
    },
  });

  const watchDuration = watch("selectedDuration");
  const watchUrgent = watch("isUrgent");

  // Calculate total dynamically
  const totalPrice = servicePrice + serviceFee + (watchUrgent ? urgentFee : 0);

  const timeOptions = ["9:00 AM", "10:00 AM", "1:00 PM", "3:00 PM"];
  const durationOptions = ["1 hour", "2 hours", "3 hours"];

  const onSubmit = (data) => {
    const bookingPayload = {
      ...data,
      workerId: workerData?.id || 1,
      servicePrice,
      serviceFee,
      urgentFee: data.isUrgent ? urgentFee : 0,
      totalPrice,
      status: "pending", // Worker will accept/reject
    };
    console.log("Booking Payload:", bookingPayload);
    // Send this payload to your backend API
  };

  return (
    <div className="min-h-screen px-6 py-8 max-w-5xl mx-auto">
      <div className="w-full max-w-5xl items-start">
        <IconButton
          icon={IoIosArrowRoundBack}
          label="Back to Search"
          onClick={() => navigate("/find-workers")}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:flex-row gap-8 shadow-sm rounded-lg p-6 bg-gray-50">
          {/* Left Section */}
          <div className="flex-1 space-y-6">
            {/* Worker Details */}
            <div className="bg-white p-5 rounded-lg shadow-sm border">
              <h2 className="font-medium mb-4 flex items-center gap-2">
                <FaUser className="w-5 h-5" /> Worker Details
              </h2>
              <div className="flex items-center gap-4">
                <img
                  src={workerData?.image || "https://via.placeholder.com/60"}
                  alt={workerData?.name || "Worker"}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {workerData?.name || "John Martinez"}
                  </h3>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                    {workerData?.role || "Electrician"}
                  </span>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>
                      {workerData?.rating || "4.9"} ({workerData?.reviews || 127} reviews)
                    </span>
                    <span className="text-gray-400">• ${workerData?.hourRate || 45}/hr</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule Service */}
            <div className="bg-white p-5 rounded-lg shadow-sm border">
              <h2 className="font-medium mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" /> Schedule Service
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Preferred Date */}
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Preferred Date</label>
                  <Controller
                    control={control}
                    name="selectedDate"
                    render={({ field }) => (
                      <CustomDateSelect
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select a date"
                      />
                    )}
                  />
                </div>

                {/* Preferred Time */}
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">Preferred Time</label>
                  <Controller
                    control={control}
                    name="selectedTime"
                    render={({ field }) => (
                      <CustomSelect
                        options={timeOptions}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select time"
                      />
                    )}
                  />
                </div>
              </div>

              {/* Estimated Duration */}
              <div className="mb-4">
                <label className="text-sm text-gray-600 mb-1 block">Estimated Duration</label>
                <Controller
                  control={control}
                  name="selectedDuration"
                  render={({ field }) => (
                    <CustomSelect
                      options={durationOptions}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select duration"
                    />
                  )}
                />
              </div>

              {/* Urgent job */}
              <div className="flex items-center gap-2">
                <Controller
                  control={control}
                  name="isUrgent"
                  render={({ field }) => (
                    <>
                      <input
                        type="checkbox"
                        id="urgent"
                        className="accent-blue-600"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                      <label htmlFor="urgent" className="text-sm text-gray-700">
                        Urgent job (+${urgentFee} fee)
                      </label>
                    </>
                  )}
                />
              </div>
            </div>

            {/* Service Location */}
            <div className="bg-white p-5 rounded-lg shadow-sm border">
              <h2 className="font-medium mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" /> Service Location
              </h2>
              <label className="text-sm text-gray-600 mb-1 block">Full Address</label>
              <Controller
                control={control}
                name="address"
                render={({ field }) => (
                  <CustomInput
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Enter your complete address including apartment/unit number"
                  />
                )}
              />
            </div>

            {/* Job Description */}
            <div className="bg-white p-5 rounded-lg shadow-sm border">
              <h2 className="font-medium mb-4 flex items-center gap-2">Job Description</h2>
              <label className="text-sm text-gray-600 mb-1 block">Describe the work needed</label>
              <Controller
                control={control}
                name="jobDescription"
                render={({ field }) => (
                  <CustomInput
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Enter a brief description of the work needed"
                    asTextarea
                    rows={4}
                  />
                )}
              />
            </div>
          </div>

          {/* Right Section - Booking Summary */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="bg-white p-5 rounded-lg shadow-sm border">
              <h2 className="font-medium mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" /> Booking Summary
              </h2>

              <div className="text-sm text-gray-700 space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Service</span>
                  <span>${servicePrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee</span>
                  <span>${serviceFee}</span>
                </div>
                {watchUrgent && (
                  <div className="flex justify-between text-red-600">
                    <span>Urgent Fee</span>
                    <span>${urgentFee}</span>
                  </div>
                )}
                <div className="border-t pt-2 font-semibold flex justify-between">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  Money-back guarantee
                </div>
                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4 text-blue-500" />
                  24/7 customer support
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 rounded transition"
              >
                Book Now - ${totalPrice}
              </button>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm border">
              <h2 className="font-medium mb-4">What happens next?</h2>
              <ol className="text-sm text-gray-700 space-y-4">
                <li className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-semibold">
                    1
                  </span>
                  <div>
                    <strong>Booking Confirmation</strong>
                    <p className="text-gray-600">
                      You'll receive instant confirmation
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-semibold">
                    2
                  </span>
                  <div>
                    <strong>Worker Contact</strong>
                    <p className="text-gray-600">
                      Worker will contact you within 30 min
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-semibold">
                    3
                  </span>
                  <div>
                    <strong>Service Delivery</strong>
                    <p className="text-gray-600">
                      Work gets done on scheduled time
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookService;
