import React, { useState } from "react";
import useStore from "../../store/useStore";

const ProductItems = ({ product }) => {
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  // Fallbacks in case product fields are undefined
  const {
    name = "",
    description = "",
    image = "/placeholder.png",
    price = 0,
  } = product || {};

  // Quantity handlers
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  // Add to cart + reset quantity
  const handleAddToCart = () => {
    const productWithSize = { ...product, selectedSize };
    addToCart(productWithSize, quantity);
    setQuantity(1);
  };

  return (
    <>
      {/* Card */}
      <div
        className="
          w-full
          max-w-xs        /* This limits how wide the card grows on large screens */
          bg-white
          border
          rounded-md
          shadow-sm
          p-4
          flex
          flex-col
          items-center
        "
      >
        {/* Image */}
        <div className="w-full h-48 mb-4 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Basic info - fixed text size (no responsive classes) */}
        <h2 className="text-base font-semibold text-gray-800 mb-1">
          {name}
        </h2>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <p className="text-base text-gray-900 font-medium mb-4">
          ${price.toFixed(2)}
        </p>

        {/* "View Details" Button - fixed text size (no responsive classes) */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="
            bg-blue-600
            text-white
            text-sm
            px-3
            py-1
            rounded
            hover:bg-blue-500
          "
        >
          View Details
        </button>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/40
            backdrop-blur-sm
          "
        >
          {/* Modal Content */}
          <div className="bg-white w-11/12 md:w-3/4 lg:w-1/2 xl:w-2/5 rounded-md shadow-lg relative p-6">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={() => setIsModalOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Modal Content Layout */}
            <div className="flex flex-col md:flex-row md:space-x-6">
              {/* Large Image in Modal */}
              <div className="mb-4 md:mb-0 md:w-1/2 flex items-center justify-center">
                <img
                  src={image}
                  alt={name}
                  className="max-h-96 object-contain"
                />
              </div>

              {/* Product Details - fixed text sizes */}
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-800 mb-2">
                  {name || "Product Title"}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  (In Stock) -{" "}
                  <span className="ml-1 text-red-500 font-semibold">
                    ${price.toFixed(2)}
                  </span>{" "}
                  <span className="line-through text-gray-400 text-sm">
                    $74.95
                  </span>
                </p>

                {/* Star rating example */}
                <div className="mb-2 flex items-center">
                  <div className="flex text-yellow-400 mr-2 text-sm">
                    {/* Placeholder for a 3.3 star rating */}
                    &#9733; &#9733; &#9733;
                    <span className="text-gray-300">&#9733;</span>
                    <span className="text-gray-300">&#9733;</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    (3.3) 25 Reviews
                  </span>
                </div>

                {/* Color */}
                <p className="mb-2 text-sm">
                  <strong>Color:</strong> Dark Indigo
                </p>

                {/* Example color swatch */}
                <div className="mb-2">
                  <div
                    className="w-6 h-6 rounded-full border border-gray-400"
                    style={{ backgroundColor: "#1A237E" }}
                    title="Dark Indigo"
                  />
                </div>

                {/* Sizes */}
                <p className="text-sm font-semibold mb-2">REGULAR</p>
                <div className="grid grid-cols-6 gap-2 mb-4">
                  {[25, 26, 27, 28, 29, 30, 31, 32, 33, 34].map((size) => {
                    const isSelected = size === selectedSize;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`
                          text-sm 
                          border 
                          border-gray-300 
                          px-2 py-1 
                          rounded 
                          hover:bg-gray-200
                          ${
                            isSelected
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-gray-700"
                          }
                        `}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>

                <p className="text-sm mb-4">
                  Inseam: <strong>Regular</strong>
                </p>

                {/* Quantity + Add to Cart */}
                <div className="flex items-center mb-6">
                  <label className="text-sm text-gray-700 mr-2">
                    Quantity:
                  </label>
                  <div className="flex items-center">
                    <button
                      onClick={decreaseQuantity}
                      className="bg-gray-300 text-gray-700 px-2 rounded-md hover:bg-gray-400 text-sm"
                    >
                      -
                    </button>
                    <span className="mx-2 text-sm">{quantity}</span>
                    <button
                      onClick={increaseQuantity}
                      className="bg-gray-300 text-gray-700 px-2 rounded-md hover:bg-gray-400 text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Add to Bag Button */}
                <button
                  onClick={handleAddToCart}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 text-sm"
                >
                  Add to Bag
                </button>

                {/* Optional "Close" button at bottom */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="
                    ml-4
                    bg-gray-400
                    text-white
                    px-3
                    py-2
                    rounded-md
                    hover:bg-gray-500
                    text-sm
                  "
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductItems;
