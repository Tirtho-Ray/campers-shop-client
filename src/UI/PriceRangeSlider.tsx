import React, { useState } from 'react';

const PriceRangeSlider: React.FC = () => {
  const values = [10, 30, 60, 80, 100, 200];
  const [index, setIndex] = useState(2); // Initial index corresponding to 60
  const [isInteracting, setIsInteracting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setIndex(value);
  };

  const handleMouseDown = () => {
    setIsInteracting(true);
  };

  const handleMouseUp = () => {
    setIsInteracting(false);
  };

  const handleMouseLeave = () => {
    setIsInteracting(false);
  };

  const handleMouseEnter = () => {
    setIsInteracting(true);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="relative w-full">
        <input
          type="range"
          min="0"
          max={values.length - 1}
          value={index}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          onChange={handleChange}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
        />
        {isInteracting && (
          <div
            id="priceDisplay"
            className="absolute -top-8 px-2 py-1 bg-gray-700 text-white text-sm rounded"
            style={{ left: `${(index / (values.length - 1)) * 100}%`, transform: 'translateX(-50%)' }}
          >
            ${values[index]}
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceRangeSlider;
