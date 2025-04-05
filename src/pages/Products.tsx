import React, { useEffect } from "react";
import useProductStore from "../store/useStore";
import ProductItems from "../components/Products/ProductItems";
import Navbar from "../components/Navbar";

const Products = () => {
  const { products, setProducts, searchQuery } = useProductStore();

  const productData = [
    {
      id: 1,
      name: "T-Shirt 1",
      description: "This is a description for product 1.",
      price: 29.99,
      image: "/shirt.png",
      category: "clothing",
    },
    {
      id: 2,
      name: "T-Shirt 2",
      description: "This is a description for product 2.",
      price: 49.99,
      image: "/shirt2.png",
      category: "clothing",
    },
    {
      id: 3,
      name: "T-Shirt 3",
      description: "This is a description for product 3.",
      price: 19.99,
      image: "/shirt3.png",
      category: "clothing",
    },
    {
      id: 4,
      name: "Laptop",
      description: "Description for product 4.",
      price: 99.99,
      image: "/laptop.jpg",
      category: "electronics",
    },
    {
      id: 5,
      name: "Mobile",
      description: "Description for product 5.",
      price: 49.99,
      image: "/mobile.jpg",
      category: "electronics",
    },
    {
      id: 6,
      name: "Watch",
      description: "Description for product 6.",
      price: 99.99,
      image: "/watch.jpg",
      category: "electronics",
    },
    {
      id: 7,
      name: "Treadmill",
      description: "Description for product 7.",
      price: 29.99,
      image: "/treadmill.jpg",
      category: "sports",
    },
    {
      id: 8,
      name: "Fitness Bike",
      description: "Description for product 8.",
      price: 49.99,
      image: "/fitness_bike.jpeg",
      category: "sports",
    },
    {
      id: 9,
      name: "Gym Set",
      description: "Description for product 9.",
      price: 19.99,
      image: "/gym_set.jpg",
      category: "sports",
    },
    {
      id: 10,
      name: "THE MAID",
      description: "Description for product 10.",
      price: 29.99,
      image: "/the_maid.jpg",
      category: "books",
    },
    {
      id: 11,
      name: "The Edible Woman",
      description: "Description for product 11.",
      price: 49.99,
      image: "/the_edible_woman.jpg",
      category: "books",
    },
    {
      id: 12,
      name: "HOW TO END A LOVE STORY",
      description: "Description for product 12.",
      price: 19.99,
      image: "/love.jpg",
      category: "books",
    },
  ];

  useEffect(() => {
    setProducts(productData);
  }, [setProducts]);

  // Filter by search query
  const filteredProducts = products.filter((product) => {
    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <Navbar />
      <div className="py-20 px-40 bg-gray-100 min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductItems key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              No products match your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
