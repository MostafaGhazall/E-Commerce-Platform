import React, { useState } from "react";
import { FaShoppingCart, FaCaretDown, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import useStore from "../store/useStore";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // For mobile menu
  const { searchQuery, setSearchQuery, cart } = useStore();

  // Toggle account dropdown
  const toggleAccount = () => setIsAccountOpen(!isAccountOpen);

  // Toggle mobile menu
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  // Calculate total quantity in the cart
  const totalCartQuantity = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <div>
      {/* Main Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <nav className="bg-gray-800 shadow-md w-full">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Left Section: Logo & Search */}
              <div className="flex items-center space-x-4">
                <div className="shrink-0">
                  <Link to="/Products" className="shrink-0">
                    <img
                      className="h-16 w-auto"
                      src="/G.png"
                      alt="Your Company"
                    />
                  </Link>
                </div>
                {/* Search Bar */}
                <div className="hidden md:block relative">
                  <form onSubmit={handleSearchSubmit} className="flex items-center">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="px-4 py-2 rounded-md w-72 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Search..."
                    />
                    <button
                      type="submit"
                      className="absolute right-2 text-white focus:outline-none"
                      aria-label="Search"
                    >
                      <FaSearch />
                    </button>
                  </form>
                </div>
              </div>

              {/* Right Section: Navigation Links */}
              <div className="hidden md:flex items-center space-x-4">
                {/* Cart Button */}
                <div className="relative">
                  <Link
                    to="/cart"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 text-sm font-medium flex items-center rounded-md"
                  >
                    <FaShoppingCart className="mr-2" />
                    Cart
                    <span className="ml-1 text-sm bg-red-500 text-white rounded-full px-2 py-1">
                      {totalCartQuantity}
                    </span>
                  </Link>
                </div>

                {/* Orders Button */}
                <div className="relative">
                  <Link
                    to="/YourOrdersPage"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 text-sm font-medium flex items-center rounded-md"
                  >
                    Orders
                  </Link>
                </div>

                {/* Account Dropdown */}
                <div className="relative">
                  <button
                    onClick={toggleAccount}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-4 py-2 text-sm font-medium flex items-center rounded-md"
                  >
                    Account
                    <FaCaretDown className="ml-2" />
                  </button>
                  {isAccountOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
                      <Link
                        to="/ProfilePage"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </Link>
                      <Link
                        to="/Home"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Hamburger Menu for Mobile */}
              <div className="md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="text-gray-300 hover:text-white focus:outline-none"
                  aria-label="Toggle Mobile Menu"
                >
                  {isMobileMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="bg-gray-700 md:hidden">
              {/* Search Bar for Mobile */}
              <div className="p-4">
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="px-4 py-2 rounded-md w-full bg-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Search..."
                  />
                  <button
                    type="submit"
                    className="ml-2 text-white focus:outline-none"
                    aria-label="Search"
                  >
                    <FaSearch />
                  </button>
                </form>
              </div>

              {/* Mobile Links */}
              <div className="space-y-1">
                <Link
                  to="/cart"
                  className="block text-gray-300 hover:bg-gray-600 hover:text-white px-4 py-2 text-sm font-medium"
                >
                  Cart
                  <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                    {totalCartQuantity}
                  </span>
                </Link>
                <Link
                  to="/YourOrdersPage"
                  className="block text-gray-300 hover:bg-gray-600 hover:text-white px-4 py-2 text-sm font-medium"
                >
                  Orders
                </Link>
                <button
                  onClick={toggleAccount}
                  className="block text-gray-300 hover:bg-gray-600 hover:text-white px-4 py-2 text-sm font-medium w-full text-left"
                >
                  Account
                  <FaCaretDown className="ml-2" />
                </button>
                {isAccountOpen && (
                  <div className="ml-4">
                    <Link
                      to="/ProfilePage"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Settings
                    </Link>
                    <Link
                      to="/Home"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 hover:text-white"
                    >
                      Sign out
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
