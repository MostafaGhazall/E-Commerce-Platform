import React from "react";
import useStore from "../store/useStore";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateCartItemQuantity } = useStore();

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * (product.quantity || 1),
    0
  );

  // Calculate total items (optional, for clarity)
  const totalItems = cart.reduce((total, product) => total + (product.quantity || 1), 0);

  return (
    <div>
      <Navbar />
      <div className="py-20 px-4 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-semibold text-gray-900 mb-6">Shopping Cart</h1>

          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center bg-white p-10 rounded-lg shadow-md">
              <img src="/cart.png" alt="Empty Cart" className="w-24 h-24 mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty!</h2>
              <Link to="/Products">
                <button className="bg-sky-700 text-white py-2 px-4 rounded-md hover:bg-sky-500">
                  Start Shopping
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between items-center bg-white p-4 rounded-md shadow-md"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                      <p className="text-gray-600">{product.description}</p>
                      <span className="text-lg font-medium text-gray-900">
                        ${product.price} x {product.quantity}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Adjustment */}
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        updateCartItemQuantity(product.id, product.quantity - 1)
                      }
                      className="bg-gray-300 text-gray-700 px-2 rounded-md hover:bg-gray-400"
                      disabled={product.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="mx-2">{product.quantity}</span>
                    <button
                      onClick={() =>
                        updateCartItemQuantity(product.id, product.quantity + 1)
                      }
                      className="bg-gray-300 text-gray-700 px-2 rounded-md hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-red-600 hover:text-red-800 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {cart.length > 0 && (
            <div className="bg-white p-6 rounded-md shadow-md mt-8">
              <h2 className="text-2xl font-semibold text-gray-800">Cart Summary</h2>
              <div className="flex justify-between mt-4">
                <span className="text-lg font-medium text-gray-800">Total Items:</span>
                <span className="text-lg font-bold text-gray-900">{totalItems}</span>
              </div>
              <div className="flex justify-between mt-4">
                <span className="text-lg font-medium text-gray-800">Total Price:</span>
                <span className="text-xl font-bold text-gray-900">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="mt-6 flex justify-end space-x-2">
                <Link to="/CheckoutPage">
                  <button className="bg-sky-700 text-white py-2 px-4 rounded-md hover:bg-sky-500">
                    Checkout
                  </button>
                </Link>
                <Link to="/Products">
                  <button className="bg-sky-700 text-white py-2 px-4 rounded-md hover:bg-sky-500">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
