import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdsCarousel from './AdsCarousel';

const SignInSignUp = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/Products');
  };

  return (
    <div className="flex h-screen">
      {/* Left side: Ads Carousel */}
      <div className="w-1/2">
        <AdsCarousel />
      </div>

      {/* Right side: SignIn/SignUp Form */}
      <div className="w-1/2 flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-md p-6 space-y-4 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center">{isSignIn ? 'Sign In' : 'Sign Up'}</h2>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {!isSignIn && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            )}

            <button
              type="submit"
              className="w-full py-3 text-white bg-blue-600 rounded-md"
            >
              {isSignIn ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div className="text-center">
            <p>
              {isSignIn ? 'Don’t have an account? ' : 'Already have an account? '}
              <button
                onClick={() => setIsSignIn(!isSignIn)}
                className="text-blue-600 hover:underline"
              >
                {isSignIn ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;
