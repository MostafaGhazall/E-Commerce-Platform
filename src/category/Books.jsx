import React, { useEffect } from 'react';
import useProductStore from '../store/useStore';
import ProductItems from '../components/Products/ProductItems';
import Navbar from '../components/Navbar';

const Books = () => {
  const { products, setProducts } = useProductStore();

  const booksData = [
    {
      id: 10,
      name: 'THE MAID',
      description: 'This is a description for product 1.',
      price: 29.99,
      image: '/the_maid.jpg',
    },
    {
      id: 11,
      name: 'The Edible Woman',
      description: 'This is a description for product 2.',
      price: 49.99,
      image: '/the_edible_woman.jpg',
    },
    {
      id: 12,
      name: 'HOW TO END A LOVE STORY',
      description: 'This is a description for product 3.',
      price: 19.99,
      image: '/love.jpg',
    },
  ];

  useEffect(() => {
    setProducts(booksData);
  }, [setProducts]);

  return (
    <div>
      <Navbar />
      <div className="py-8 px-4 bg-gray-100 min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductItems key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Books;
