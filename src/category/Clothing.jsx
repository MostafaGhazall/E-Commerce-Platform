import React, { useEffect } from 'react';
import useProductStore from '../store/useStore';
import ProductItems from '../components/Products/ProductItems';
import Navbar from '../components/Navbar';

const Clothing = () => {
  const { products, setProducts } = useProductStore();

  const clothingData = [
    {
      id: 1,
      name: 'T-Shirt 1',
      description: 'This is a description for product 1.',
      price: 29.99,
      image: '/shirt.png',
    },
    {
      id: 2,
      name: 'T-Shirt 2',
      description: 'This is a description for product 2.',
      price: 49.99,
      image: '/shirt2.png',
    },
    {
      id: 3,
      name: 'T-Shirt 3',
      description: 'This is a description for product 3.',
      price: 19.99,
      image: '/shirt3.png',
    },
  ];

  useEffect(() => {
    setProducts(clothingData);
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

export default Clothing;
