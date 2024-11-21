import React, { useState, useEffect } from 'react';
import { FaHeart, FaShareAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Button from './Button'; 
import { API_URL } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, setCartData, setCartStatus } from '../redux/CartSlice';

const ProductList = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const cartStatus = useSelector((state) => state.cart.cartStatus); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector((state) => state.products.filteredProducts);

  useEffect(() => {
    const fetchInitialData = async () => {
      const userId = localStorage.getItem('userId'); 

      try {
        const productResponse = await fetch(`${API_URL}/product`);
        if (productResponse.ok) {
          const productData = await productResponse.json();
          setProducts(productData);
          dispatch({
            type: "products/setProducts",
            payload: productData,
          });
        }

        if (userId) {
          const cartResponse = await fetch(`${API_URL}/cart?userId=${userId}`);
          if (cartResponse.ok) {
            const cartData = await cartResponse.json();
        
            dispatch({
              type: "cart/setCartData", 
              payload: {
                items: cartData.items,
                totalPrice: cartData.totalPrice, 
              },
            });
            dispatch({
              type: "cart/setCartStatus", 
              payload: cartData.cartStatus,
            });
            setTotalPrice(cartData.totalPrice);
            dispatch(setCartStatus(cartData.cartStatus));
          }
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, [dispatch]);

  const handleCartClick = async (productId) => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert('Please log in to add items to the cart.');
      return;
    }

    if (cartStatus[productId]) {
      navigate('/cart'); 
    } else {
      try {
        const product = products.find((p) => p._id === productId); 

  
        dispatch(addToCart({ productId, productData: product }));
        dispatch(setCartStatus({ ...cartStatus, [productId]: true }));

       
        const response = await fetch(`${API_URL}/addtocart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            productId: product._id,
            quantity: 1,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          dispatch(setCartData({
            items: data.items,
            totalPrice: data.totalPrice, 
          }));
          setTotalPrice(data.totalPrice); 
        } else {
          console.error('Failed to add product to cart.');
       
          dispatch(setCartStatus({ ...cartStatus, [productId]: false }));
        }
      } catch (error) {
        console.error('Error adding product to cart:', error);

        dispatch(setCartStatus({ ...cartStatus, [productId]: false }));
      }
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i} className="text-yellow-500">★</span>); 
      } else {
        stars.push(<span key={i} className="text-gray-400">★</span>); 
      }
    }
    return stars;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {product.length > 0 ? (
        product.map((product) => (
          <div
            key={product._id}
            className="relative p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="absolute top-2 left-2 bg-purple-700 text-white text-sm font-bold rounded-full w-10 h-10 p-1 flex justify-center items-center">
              -{Math.round(((product.mrp - product.offerPrice) / product.mrp) * 100)}%
            </div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <div className="absolute top-2 right-2 flex space-x-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <button className="p-1 bg-white rounded-full shadow hover:bg-gray-200">
                <FaHeart className="text-purple-700" />
              </button>
              <button className="p-1 bg-white rounded-full shadow hover:bg-gray-200">
                <FaShareAlt className="text-purple-700" />
              </button>
            </div>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.company}</p>
          
            <div className="flex items-center mt-1">
              {renderStars(product.rating)}
            </div>
            <div className="flex items-center mt-2">
              <span className="text-lg font-bold text-purple-700">₹{product.offerPrice}</span>
              <span className="text-sm text-gray-400 line-through ml-2">₹{product.mrp}</span>
            </div>
            <Button
              className={`mt-4 w-full ${
                cartStatus[product._id] ? 'bg-green-700 hover:bg-green-800' : 'bg-purple-700 hover:bg-purple-800'
              } text-white`}
              onClick={() => handleCartClick(product._id)}
            >
              {cartStatus[product._id] ? 'Go to Cart' : 'Add to Cart'}
            </Button>
          </div>
        ))
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
};

export default ProductList;
