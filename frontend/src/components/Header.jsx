import React from 'react';
import { FaBars, FaUser, FaSync, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { HiOutlineSquares2X2 } from "react-icons/hi2";


import Button from './Button'; 
import { useSelector } from 'react-redux';
import { setCartData } from '../redux/CartSlice';
import { Link } from 'react-router-dom';

const Header = () => {
  const totalPrice = useSelector((state) => state.cart?.totalPrice || 0);
  const cartData = useSelector((state) => state.cart?.cartData || []);

  console.log("length", cartData.length);
  


  return (

    <header className="bg-[#E6E3EE] shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-14">
       
        <div className="flex items-center space-x-4">
         
          <Button
            name="allCategories"
            className="bg-white shadow-xl text-black !rounded-[9999px] flex items-center hover:bg-purple-700"
            onClick={() => alert('All Categories clicked!')}
          >
            <div className="bg-[#440447] rounded-full w-8 h-8 flex justify-center items-center">
              <HiOutlineSquares2X2 className="w-6 h-7 text-[#999015]" />
            </div>
            <span className="ml-3 font-mono text-md">All Categories</span>
          </Button>

          <nav className="hidden md:flex space-x-4">
            <Button
              name="deals"
              className="text-gray-700 hover:text-purple-600"
              onClick={() => alert('Deals clicked!')}
            >
              Deals
            </Button>
            <Button
              name="shop"
              className="text-gray-700 hover:text-purple-600"
              onClick={() => alert('Shop clicked!')}
            >
              Shop
            </Button>
            <Button
              name="contacts"
              className="text-gray-700 hover:text-purple-600"
              onClick={() => alert('Our Contacts clicked!')}
            >
              Our Contacts
            </Button>
            <Button
              name="stores"
              className="text-gray-700 hover:text-purple-600"
              onClick={() => alert('Stores clicked!')}
            >
              Stores
            </Button>
          </nav>
        </div>

       
        <div className="flex items-center space-x-6">
         
          <Button
            name="profile"
            className="relative text-gray-700 bg-white !rounded-[99999px] shadow-lg w-12 h-12 flex justify-center items-center"
            onClick={() => alert('Profile clicked!')}
          >
            <FaUser className="text-xl" />
          </Button>
          <Button
            name="refresh"
            className="relative text-gray-700 bg-white !rounded-[99999px] shadow-lg w-12 h-12 flex justify-center items-center"
            onClick={() => alert('Refresh clicked!')}
          >
            <FaSync className="text-xl" />
            <span className="absolute top-0 right-0 bg-white text-black shadow-full font-mono text-xs rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </Button>
          <Button
            name="wishlist"
            className="relative text-gray-700 bg-white !rounded-[99999px] shadow-lg w-12 h-12 flex justify-center items-center"
            onClick={() => alert('Wishlist clicked!')}
          >
            <FaHeart className="text-xl" />
            <span className="absolute top-0 right-0 bg-white text-black shadow-full font-mono text-xs rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </Button>
          <Link to="/cart">
          
          <Button
            name="cart"
            className="relative text-gray-700 bg-[#440447] !rounded-[99999px] shadow-lg w-12 h-12 flex justify-center items-center"
            onClick={() => alert('Cart clicked!')}
          >
            <FaShoppingCart className="text-xl text-[#999015]" />
            <span className="absolute top-0 right-0 bg-white font-mono text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {cartData.length||0}
            </span>
          </Button>
          </Link>

          <span className="text-gray-700 font-medium">₹{totalPrice}</span>
          
        </div>
      </div>
    </header>
  );
};

export default Header;
