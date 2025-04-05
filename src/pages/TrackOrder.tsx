import React from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";

const TrackOrderPage = () => {
  const location = useLocation();
  const order = location.state?.order; // Retrieve the order from the state

  if (!order) {
    return (
      <div>
        <Navbar />
        <div className="py-8 px-4 bg-gray-100 min-h-screen">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-3xl font-semibold text-gray-900 mb-4 pt-14">Order Not Found</h1>
            <p className="text-gray-600">We could not find the order you're trying to track.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="py-8 px-4 bg-gray-100 min-h-screen">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl font-semibold text-gray-900 mb-6 pt-10">Track Order</h1>

          {/* Expected Delivery */}
          <div className="mb-4">
            <p className="text-lg font-medium text-gray-700">Expected delivery:</p>
            <p className="text-2xl font-bold text-gray-900">{order.deliveryDate || "TOMORROW"}</p>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center">
              {/* Icon 1 */}
              <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-full">
                <span role="img" aria-label="store">
                  🏠
                </span>
              </div>
              <div className="w-16 h-1 bg-gray-300"></div>

              {/* Icon 2 */}
              <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full">
                <span role="img" aria-label="truck">
                  🚚
                </span>
              </div>
              <div className="w-16 h-1 bg-gray-300"></div>

              {/* Icon 3 */}
              <div className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-full">
                <span role="img" aria-label="check">
                  ✔️
                </span>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="mb-6">
            <p className="text-lg font-medium text-gray-700">Status:</p>
            <p className="text-2xl font-bold text-gray-900">{order.status || "ON ITS WAY"}</p>
            <p className="text-sm text-gray-600 mt-2">
              {order.statusMessage || "Great news! You can almost unpack your order."}
            </p>
          </div>

          {/* Order ID */}
          <div>
            <p className="text-lg font-medium text-gray-700">Order Id:</p>
            <p className="text-lg font-bold text-gray-900">{order.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;
