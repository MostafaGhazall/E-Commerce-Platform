import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import useStore from '../store/useStore';

const ProfilePage = () => {
  // --- Zustand state ---
  const { 
    user, 
    setUser, 
    defaultAddress, 
    setDefaultAddress 
  } = useStore();

  // --- Local state for toggling forms ---
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showAccountForm, setShowAccountForm] = useState(false); // NEW CODE HERE

  // --- Handlers for address form ---
  const handleAddAddressClick = () => {
    setShowAddressForm(true);
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();

    // Extract address details from the form
    const formData = new FormData(e.target);
    const savedAddress = {
      fullName: formData.get('fullName'),
      addressLine1: formData.get('addressLine1'),
      addressLine2: formData.get('addressLine2'),
      city: formData.get('city'),
      state: formData.get('state'),
      zipCode: formData.get('zipCode'),
      country: formData.get('country'),
    };

    setDefaultAddress(savedAddress); // Update Zustand state
    setShowAddressForm(false); // Hide the form
  };

  // --- Handlers for account details form (NEW CODE HERE) ---
  const handleEditAccountClick = () => {
    setShowAccountForm(true);
  };

  const handleSaveAccount = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const updatedUser = {
      name: formData.get('name'),
      email: formData.get('email'),
    };

    setUser(updatedUser);
    setShowAccountForm(false);
  };

  return (
    <div>
      <Navbar />
      <div className="py-8 px-4 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-semibold text-gray-900 mb-6">
            Account Overview
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Account Details */}
            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Account Details
              </h2>

              {/* If you have a user object in Zustand */}
              <p className="text-gray-600">{user.name}</p>
              <p className="text-gray-600">{user.email}</p>

              {/* Edit Account Details Button (NEW CODE HERE) */}
              <button
                onClick={handleEditAccountClick}
                className="text-sky-600 font-semibold mt-4 hover:underline"
              >
                Edit Account Details
              </button>
            </div>

            {/* Address Book */}
            <div className="bg-white p-4 rounded-md shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Address Book
              </h2>
              {defaultAddress ? (
                <div>
                  <p className="text-gray-600">
                    <strong>Full Name:</strong> {defaultAddress.fullName}
                  </p>
                  <p className="text-gray-600">
                    <strong>Address Line 1:</strong> {defaultAddress.addressLine1}
                  </p>
                  {defaultAddress.addressLine2 && (
                    <p className="text-gray-600">
                      <strong>Address Line 2:</strong> {defaultAddress.addressLine2}
                    </p>
                  )}
                  <p className="text-gray-600">
                    <strong>City:</strong> {defaultAddress.city}
                  </p>
                  <p className="text-gray-600">
                    <strong>State/Province/Region:</strong> {defaultAddress.state}
                  </p>
                  <p className="text-gray-600">
                    <strong>ZIP/Postal Code:</strong> {defaultAddress.zipCode}
                  </p>
                  <p className="text-gray-600">
                    <strong>Country:</strong> {defaultAddress.country}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600">Your default shipping address:</p>
                  <p className="text-gray-600 italic">
                    No default shipping address available.
                  </p>
                </div>
              )}
              <button
                onClick={handleAddAddressClick}
                className="text-sky-600 font-semibold mt-4 hover:underline"
              >
                {defaultAddress ? 'Edit Address' : 'Add Address'}
              </button>
            </div>

            {/* Store Credit */}
            <div className="bg-white p-4 rounded-md shadow-md col-span-1 md:col-span-2">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Store Credit
              </h2>
              <p className="text-gray-600">
                <span className="inline-flex items-center">
                  <img src="/wallet.png" alt="wallet" className="w-6 h-6 mr-1" />
                  Store credit balance: EGP 999.00
                </span>
              </p>
            </div>
          </div>

          {/* Address Form */}
          {showAddressForm && (
            <form
              onSubmit={handleSaveAddress}
              className="mt-6 bg-gray-50 p-4 rounded-md shadow-md"
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  name="fullName"
                  type="text"
                  defaultValue={defaultAddress?.fullName || ''}
                  placeholder="Full Name"
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Address Line 1
                </label>
                <input
                  name="addressLine1"
                  type="text"
                  defaultValue={defaultAddress?.addressLine1 || ''}
                  placeholder="Street address, P.O. box, company name, c/o"
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Address Line 2
                </label>
                <input
                  name="addressLine2"
                  type="text"
                  defaultValue={defaultAddress?.addressLine2 || ''}
                  placeholder="Apartment, suite, unit, building, floor, etc."
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    name="city"
                    type="text"
                    defaultValue={defaultAddress?.city || ''}
                    placeholder="City"
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    State/Province/Region
                  </label>
                  <input
                    name="state"
                    type="text"
                    defaultValue={defaultAddress?.state || ''}
                    placeholder="State/Province/Region"
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
              </div>
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    ZIP/Postal Code
                  </label>
                  <input
                    name="zipCode"
                    type="text"
                    defaultValue={defaultAddress?.zipCode || ''}
                    placeholder="ZIP/Postal Code"
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    name="country"
                    type="text"
                    defaultValue={defaultAddress?.country || ''}
                    placeholder="Country"
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
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
          )}

          {/* Account Details Form (NEW CODE HERE) */}
          {showAccountForm && (
            <form
              onSubmit={handleSaveAccount}
              className="mt-6 bg-gray-50 p-4 rounded-md shadow-md"
            >
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  defaultValue={user.name}
                  placeholder="Full Name"
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  defaultValue={user.email}
                  placeholder="Email Address"
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAccountForm(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-500"
                >
                  Save Account
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
