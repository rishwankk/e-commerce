import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterProducts, resetFilters } from '../redux/productSlice';
import Button from './Button';

const Sidebar = () => {
  const [minPrice, setMinPrice] = useState(399);
  const [maxPrice, setMaxPrice] = useState(100000); // Updated maxPrice to 100000
  const [selectedCategory, setSelectedCategory] = useState(null); // For tracking selected category
  const dispatch = useDispatch();

  const categories = [
    'Mobile Phones',
    'Laptops',
    'Headphones',
    'Television',
    'Cameras',
    'Smartwatches',
  ];

  const handleApply = () => {
    dispatch(filterProducts({ minPrice, maxPrice, category: selectedCategory }));
  };

  const handleReset = () => {
    setMinPrice(399);
    setMaxPrice(100000); // Reset maxPrice to 100000
    setSelectedCategory(null); // Reset category filter
    dispatch(resetFilters());
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(Math.min(e.target.value, maxPrice));
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(Math.max(e.target.value, minPrice));
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="bg-gray-100 w-full md:w-80 p-6 ml-10 mt-2 shadow-lg rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Filter by Price</h3>
      <h3 className="text-lg font-semibold mb-4">Categories</h3>
      <ul className="space-y-2 mb-4">
        {categories.map((category, index) => (
          <li
            key={index}
            className={`cursor-pointer text-gray-700 hover:text-purple-700 ${
              selectedCategory === category ? 'font-semibold text-purple-700' : ''
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mb-4">
        <input
          type="number"
          value={minPrice}
          onChange={handleMinPriceChange}
          className="w-[47%] p-2 border border-gray-300 text-center"
        />
        <input
          type="number"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          className="w-[47%] p-2 border border-gray-300 text-center"
        />
      </div>


      <div className="relative flex items-center mb-4">
        <input
          type="range"
          min="399"
          max="100000" // Updated max to 100000
          value={minPrice}
          onChange={(e) => setMinPrice(Math.min(e.target.value, maxPrice))}
          className="absolute w-full h-1 bg-transparent z-10"
          style={{ accentColor: '#6B46C1' }}
        />
        <input
          type="range"
          min="399"
          max="100000" // Updated max to 100000
          value={maxPrice}
          onChange={(e) => setMaxPrice(Math.max(e.target.value, minPrice))}
          className="absolute w-full h-1 bg-transparent z-20"
          style={{ accentColor: '#6B46C1' }}
        />
        <div className="w-full h-1 bg-gray-300 rounded"></div>
        <div
          className="absolute h-1 bg-purple-600 rounded"
          style={{
            left: `${((minPrice - 399) / (100000 - 399)) * 100}%`, // Updated calculation for 100000
            right: `${100 - ((maxPrice - 399) / (100000 - 399)) * 100}%`, // Updated calculation for 100000
          }}
        ></div>
      </div>

     

      <div className="flex justify-between mt-4">
        <Button onClick={handleReset} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
          Reset
        </Button>
        <Button onClick={handleApply} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
          Apply
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
