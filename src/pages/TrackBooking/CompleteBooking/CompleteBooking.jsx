import { CheckCircle, Star, Download, Share2, Camera } from 'lucide-react';
import { FaRegStar } from 'react-icons/fa';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CompleteBooking = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [recommend, setRecommend] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state?.booking;

  if (!booking) return <div>No booking data available</div>;

  const worker = {
    name: booking.worker_name || "John Martinez",
    skills: booking.worker_skills || ["Electrician"],
    image: "/avatar.jpg",
    rating: 4.9,
    reviews: 127,
  };

  return (
    <div className='min-h-screen bg-gray-50 p-6 flex flex-col items-center gap-8'>
      {/* Back Button */}
      <div className="w-full max-w-5xl">
        <button
          onClick={() => navigate(-1)}
          className="group inline-flex items-center gap-1 text-gray-900 font-medium relative"
        >
          <CheckCircle size={20} />
          <span className="ml-1 relative">
            Back to Dashboard
            <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
          </span>
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Left Section */}
        <div className="col-span-2 flex flex-col gap-6">
          {/* Work Completed Banner */}
          <div className="flex flex-col items-center md:items-start">
            <CheckCircle size={36} className="text-green-500 mb-2" />
            <h2 className="text-2xl font-semibold mb-1">Work Completed!</h2>
            <span className="text-gray-500">Your service has been successfully completed</span>
          </div>

          {/* Service Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-row gap-4 items-center mb-4">
              <img src={worker.image} alt="Worker" className="w-16 h-16 rounded-full" />
              <div>
                <div className="font-semibold">{worker.name}</div>
                <span className="text-xs bg-gray-200 rounded px-2 py-1 mr-2">{worker.skills[0]}</span>
                <div className="flex flex-row items-center mt-1">
                  <Star size={16} className="text-yellow-400" />
                  <span className="ml-1 text-sm">{worker.rating} ({worker.reviews} reviews)</span>
                </div>
              </div>
            </div>
            <div className="text-sm mb-2">
              <div>Service Date: {booking.booking_date}</div>
              <div>Duration: {booking.booking_time} ({booking.booking_duration})</div>
            </div>
            <ul className="list-none mt-2">
              {booking.tasks?.map((task, idx) => (
                <li className="flex items-center gap-2" key={idx}>
                  <CheckCircle size={16} className="text-green-500" />
                  {task}
                </li>
              ))}
            </ul>
          </div>

          {/* Rating & Review */}
          <div className="bg-white rounded-lg shadow p-6 mt-4">
            <div className="font-semibold mb-2">Rate Your Experience</div>
            <div className="flex gap-1 mb-2">
              {[1,2,3,4,5].map(i => (
                <FaRegStar
                  key={i}
                  size={28}
                  className={i <= rating ? "text-yellow-400" : "text-gray-300"}
                  onClick={() => setRating(i)}
                />
              ))}
            </div>
            <textarea
              placeholder="Share details about your experience..."
              className="border rounded w-full p-2 mb-2"
              value={review}
              onChange={e => setReview(e.target.value)}
            />
            <div className="flex items-center mb-2">
              <input type="checkbox" checked={recommend} onChange={() => setRecommend(!recommend)} />
              <span className="ml-2 text-sm">I would recommend this worker to others</span>
            </div>
            <button className="flex items-center gap-2 px-3 py-2 border rounded mb-2">
              <Camera size={16} /> Add Photos
            </button>
            <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded">Submit Review</button>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Payment Info */}
          <div className="bg-white rounded-lg shadow p-6 flex flex-col gap-4">
            <div>
              <div className="flex justify-between">
                <span>Service Cost</span>
                <span className="font-semibold">${booking.price_service}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Service Fee</span>
                <span>${booking.price_service_fee}</span>
              </div>
              {booking.price_urgent_fee > 0 &&
                <div className="flex justify-between mt-1">
                  <span>Urgent Fee</span>
                  <span>${booking.price_urgent_fee}</span>
                </div>
              }
              <div className="flex justify-between mt-2 font-bold">
                <span>Total</span>
                <span>${booking.price_total}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              {["No Tip", 5, 10, 15, 20].map((tip, i) => (
                <button key={i} className={`px-2 py-1 rounded ${tip === "No Tip" ? "bg-gray-200" : "bg-blue-100"}`}>{tip}</button>
              ))}
            </div>
            <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs mt-2">Payment Processed Successfully</div>
            <div className="flex gap-2 mt-2">
              <button className="flex items-center gap-1 px-3 py-2 border rounded">
                <Download size={16} /> Download Receipt
              </button>
              <button className="flex items-center gap-1 px-3 py-2 border rounded">
                <Share2 size={16} /> Share Experience
              </button>
            </div>
            <button className="mt-2 w-full bg-blue-50 rounded py-2 text-blue-600">Book Another Service</button>
            <button className="w-full rounded py-2 mt-1 border">Go to Dashboard</button>
            <button className="w-full bg-blue-900 text-white py-2 mt-3 rounded">Save as Preferred Worker</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteBooking;
