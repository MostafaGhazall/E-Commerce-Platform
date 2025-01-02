import React, { useState, useEffect } from 'react';

const AdsCarousel = () => {
  const ads = [
    // '/sale.png',
    // '/shopping.png',
    // '/women.png',
    '/1.jpg',
    '/2.jpg',
    '/3.jpg',
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 3000); // Change ad every 3 seconds

    return () => clearInterval(interval);
  }, [ads.length]);

  return (
    <div className="w-full h-full bg-gray-100 flex justify-center items-center">
      <img
        src={ads[currentIndex]}
        alt="Ad"
        className="w-auto h-auto object-cover rounded-lg"
      />
    </div>
  );
};

export default AdsCarousel;
