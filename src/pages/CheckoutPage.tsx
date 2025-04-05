import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import useStore from "../store/useStore";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const CheckoutPage = () => {
  // ----------------------
  //   Zustand state
  // ----------------------
  const {
    cart,
    setOrders,
    clearCart,
    defaultAddress,
    setDefaultAddress, // <--- NEW: Make sure to import this
    user,
    setUser,
  } = useStore();

  // ----------------------
  //   Local states
  // ----------------------
  const [email, setEmail] = useState(user?.email || "");
  const [name, setName] = useState(user?.name || "");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  // Track if user info is missing
  const [isUserInfoMissing, setIsUserInfoMissing] = useState(false);

  // Track if shipping address is missing
  const [showAddressForm, setShowAddressForm] = useState(false); // <--- NEW

  const navigate = useNavigate();

  // React Hook Form for card info
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  // ----------------------
  //  Check if user info is missing
  // ----------------------
  useEffect(() => {
    if (!user?.name || !user?.email) {
      setIsUserInfoMissing(true);
    }
  }, [user]);

  // ----------------------
  //  If address is missing, show address form
  // ----------------------
  useEffect(() => {
    if (!defaultAddress) {
      setShowAddressForm(true);
    }
  }, [defaultAddress]);

  // ----------------------
  //  Save user info if missing
  // ----------------------
  const handleSaveUserInfo = (e) => {
    e.preventDefault();

    // Very basic validation here; you could do more if needed
    if (!name || !email) {
      alert("Please fill out your Name and Email.");
      return;
    }

    // Update Zustand store with new user info
    setUser({ name, email });
    setIsUserInfoMissing(false);
  };

  // ----------------------
  //  Save shipping address from the Checkout page
  // ----------------------
  const handleSaveAddress = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newAddress = {
      fullName: formData.get("fullName"),
      addressLine1: formData.get("addressLine1"),
      addressLine2: formData.get("addressLine2") || "",
      city: formData.get("city"),
      state: formData.get("state"),
      zipCode: formData.get("zipCode"),
      country: formData.get("country"),
    };

    if (!newAddress.fullName || !newAddress.addressLine1 || !newAddress.city) {
      alert("Please fill in the required address fields (Name, Address Line 1, City, etc.)");
      return;
    }

    setDefaultAddress(newAddress);
    setShowAddressForm(false);
  };

  // ----------------------
  //  Place Order
  // ----------------------
  const handlePlaceOrder = (cardInfo) => {
    // 1) Check user info
    if (!user?.name || !user?.email) {
      alert("Please provide your name and email before placing the order.");
      return;
    }

    // 2) Check shipping address
    if (!defaultAddress) {
      alert("Please provide a shipping address before placing the order.");
      return;
    }

    // Construct new order object
    const newOrder = {
      id: Date.now(),
      email: user.email,
      name: user.name,
      shippingAddress: defaultAddress,
      paymentMethod,
      cardInfo: paymentMethod === "card" ? cardInfo : null,
      items: cart,
      totalPrice,
      date: new Date().toLocaleString(),
    };

    // Update orders in Zustand
    setOrders((prevOrders) => [...prevOrders, newOrder]);
    clearCart();

    // Navigate to Your Orders Page
    navigate("/YourOrdersPage");
  };

  // ----------------------
  //  Render
  // ----------------------
  return (
    <div>
      <Navbar />
      <div className="py-8 px-4 bg-gray-100 min-h-screen">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-semibold text-gray-900 mb-6">Checkout</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Section: Steps 1,2,3 */}
            <div className="col-span-2 space-y-6">
              {/* STEP 1: Account Info (Name & Email) */}
              <div className="bg-white p-4 rounded-md shadow-md">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  1. Account Info
                </h2>
                {isUserInfoMissing ? (
                  <form onSubmit={handleSaveUserInfo} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your Email"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-500"
                    >
                      Save Info
                    </button>
                  </form>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-800 font-medium">{user.name}</p>
                      <p>{user.email}</p>
                    </div>
                    <button
                      onClick={() => setIsUserInfoMissing(true)}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>

              {/* STEP 2: Shipping Address */}
              <div className="bg-white p-4 rounded-md shadow-md">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  2. Shipping Address
                </h2>

                {/* If address is missing, show a form. Otherwise, display it. */}
                {showAddressForm ? (
                  <form onSubmit={handleSaveAddress} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Recipient Name"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Address Line 1
                      </label>
                      <input
                        type="text"
                        name="addressLine1"
                        placeholder="Street address, P.O. box, company name, etc."
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        name="addressLine2"
                        placeholder="Apartment, suite, unit, building, floor, etc."
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        State/Province/Region
                      </label>
                      <input
                        type="text"
                        name="state"
                        placeholder="State/Province/Region"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        ZIP/Postal Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        placeholder="ZIP or Postal Code"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        className="w-full px-3 py-2 border rounded-md"
                      />
                    </div>

                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setShowAddressForm(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-500"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                ) : defaultAddress ? (
                  <div>
                    <p>
                      <strong>Full Name:</strong> {defaultAddress.fullName}
                    </p>
                    <p>
                      <strong>Address Line 1:</strong> {defaultAddress.addressLine1}
                    </p>
                    {defaultAddress.addressLine2 && (
                      <p>
                        <strong>Address Line 2:</strong> {defaultAddress.addressLine2}
                      </p>
                    )}
                    <p>
                      <strong>City:</strong> {defaultAddress.city}
                    </p>
                    <p>
                      <strong>State/Province/Region:</strong> {defaultAddress.state}
                    </p>
                    <p>
                      <strong>ZIP/Postal Code:</strong> {defaultAddress.zipCode}
                    </p>
                    <p>
                      <strong>Country:</strong> {defaultAddress.country}
                    </p>
                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="text-blue-600 hover:underline mt-2"
                    >
                      Edit Address
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-600 italic">
                    No default shipping address available.
                  </p>
                )}
              </div>

              {/* STEP 3: Payment Method */}
              <div className="bg-white p-4 rounded-md shadow-md">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  3. Payment Method
                </h2>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="cash"
                      checked={paymentMethod === "cash"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="form-radio"
                    />
                    <span>Cash on Delivery</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="form-radio"
                    />
                    <span>Credit/Debit Card</span>
                  </label>
                </div>
              </div>

              {/* Credit Card Form */}
              {paymentMethod === "card" && (
                <form
                  className="bg-white p-4 rounded-md shadow-md space-y-4"
                  onSubmit={handleSubmit(handlePlaceOrder)}
                >
                  <h2 className="text-lg font-semibold text-gray-800">
                    Card Information
                  </h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Card Number
                    </label>
                    <input
                      {...register("cardNumber", {
                        required: "Card number is required",
                        pattern: {
                          value: /^[0-9]{16}$/,
                          message: "Invalid card number",
                        },
                      })}
                      type="text"
                      placeholder="1234 5678 9101 1121"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    {errors.cardNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.cardNumber.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Expiration Date
                    </label>
                    <input
                      {...register("expirationDate", {
                        required: "Expiration date is required",
                        pattern: {
                          value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                          message: "Invalid expiration date (MM/YY)",
                        },
                      })}
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    {errors.expirationDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.expirationDate.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <input
                      {...register("cvv", {
                        required: "CVV is required",
                        pattern: {
                          value: /^[0-9]{3,4}$/,
                          message: "Invalid CVV",
                        },
                      })}
                      type="text"
                      placeholder="123"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.cvv.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="bg-sky-600 text-white w-full py-3 rounded-md hover:bg-sky-500"
                  >
                    Confirm Payment
                  </button>
                </form>
              )}

              {/* Place Order Button for Cash */}
              {paymentMethod === "cash" && (
                <button
                  onClick={() => handlePlaceOrder(null)}
                  className="bg-sky-600 text-white w-full py-3 rounded-md hover:bg-sky-500"
                >
                  Place Order
                </button>
              )}
            </div>

            {/* Right Section: Order Summary */}
            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Order Summary
              </h2>
              <ul className="space-y-4">
                {cart.map((product) => (
                  <li key={product.id} className="flex justify-between">
                    <div>
                      <p className="text-gray-800 font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {product.quantity}
                      </p>
                    </div>
                    <p className="text-gray-800 font-medium">
                      ${(product.price * product.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-4 border-t pt-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 mt-2">
                  <span>Total (incl. VAT):</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
