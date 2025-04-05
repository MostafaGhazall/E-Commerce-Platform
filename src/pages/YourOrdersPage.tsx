import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import useStore from "../store/useStore";

const YourOrdersPage = () => {
  const { orders } = useStore();

  return (
    <div>
      <Navbar />
      <div className="py-16 px-4 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-semibold text-gray-900 mb-6 pt-4">Your Orders</h1>
          {orders.length === 0 ? (
            <p className="text-gray-600">You have no orders yet.</p>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => {
                // Calculate total quantity and total price for the order
                const totalQuantity = order.items.reduce(
                  (total, item) => total + item.quantity,
                  0
                );
                const totalOrderPrice = order.items.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                );

                return (
                  <div key={order.id} className="bg-white p-6 rounded-md shadow-md">
                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                      Order ID: {order.id}
                    </h2>
                    <p className="text-gray-600">Date: {order.date}</p>
                    <p className="text-gray-600">Total Items: {totalQuantity}</p>
                    <p className="text-gray-600">
                      Total Price: ${totalOrderPrice.toFixed(2)}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {order.items.map((item) => (
                        <li key={item.id} className="flex justify-between">
                          <span>
                            {item.name} (x{item.quantity})
                          </span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Track Order Link */}
                    <Link
                      to={{
                        pathname: `/TrackOrder`,
                      }}
                      state={{ order }} // Pass the entire order as state
                      className="text-blue-600 hover:underline mt-4 inline-block"
                    >
                      Track Order
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default YourOrdersPage;
