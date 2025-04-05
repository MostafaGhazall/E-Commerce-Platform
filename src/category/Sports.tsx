import React, { useEffect } from 'react';
import useProductStore from '../store/useStore';
import ProductItems from '../components/Products/ProductItems';
import Navbar from '../components/Navbar';

const Sports = () => {
  const { products, setProducts } = useProductStore();

  const sportsData = [
    {
      id: 7,
      name: 'Treadmill',
      description: 'This is a description for product 1.',
      price: 29.99,
      image: '/treadmill.jpg',
    },
    {
      id: 8,
      name: 'Fitness Bike',
      description: 'This is a description for product 2.',
      price: 49.99,
      image: '/fitness_bike.jpeg',
    },
    {
      id: 9,
      name: 'Gym Set',
      description: 'This is a description for product 3.',
      price: 19.99,
      image: '/gym_set.jpg',
    },
  ];

  useEffect(() => {
    setProducts(sportsData);
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

export default Sports;
