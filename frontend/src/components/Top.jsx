import React from "react";
import { IoMenuSharp } from "react-icons/io5";
import { AiOutlineDown } from "react-icons/ai";
import { PiDotsNineBold } from "react-icons/pi";

const Top = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center border-b pb-4 md:pb-2">
      {/* Left Section - Title */}
      <div>
        <h1 className="text-2xl font-semibold font-mono">Mobile Accessories</h1>
      </div>

      {/* Right Section - Controls */}
      <div className="flex flex-wrap gap-4 md:gap-6 mt-4 md:mt-0 items-center justify-between md:justify-end w-full md:w-auto">
        {/* Show Options */}
        <div className="flex items-center text-gray-700">
          <span className="mr-2">Show:</span>
          <div className="flex items-center">
            <button className="text-blue-600 hover:underline">9</button>
            <span className="mx-2">/</span>
            <button className="text-blue-600 hover:underline">12</button>
            <span className="mx-2">/</span>
            <button className="text-blue-600 hover:underline">18</button>
            <span className="mx-2">/</span>
            <button className="text-blue-600 hover:underline">24</button>
          </div>
        </div>

        {/* View Options */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-md">
            <IoMenuSharp size={25} />
          </button>
          <button className="p-2 rounded-md">
            <PiDotsNineBold size={25} />
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center border px-3 py-2 rounded-md">
          <span>Sort by popularity</span>
          <AiOutlineDown size={16} className="ml-2" />
        </div>
      </div>
    </div>
  );
};

export default Top;
