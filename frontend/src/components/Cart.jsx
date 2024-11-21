import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { API_URL } from "../constants";
import Button from "./Button";
import { useNavigate } from "react-router-dom";


const updateCartData = (cartData) => ({
  type: "cart/updateCartData",
  payload: cartData,
});


const clearCart = () => ({
  type: "cart/clearCart",
});

const CartPage = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart?.cartData || []);
  const totalPrice = useSelector((state) => state.cart?.totalPrice || 0);
  const navigate=useNavigate()

  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const userId = localStorage.getItem("userId");
  const handleGoBack=()=>{
    navigate("/")

  }

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity <= 0) {
      alert("To remove the item, please use the delete option (if implemented).");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/updatecart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId, quantity }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      dispatch(updateCartData(data.cart));
    } catch (error) {
      console.error("Error updating cart:", error.message);
      alert("Failed to update cart. Please try again.");
    }
  };

  const handlePlaceOrder = async () => {
    if (!address || !email) {
      alert("Please fill in all fields before placing the order.");
      return;
    }

    const orderDetails = {
      email,
      address,
      orderDetails: cartData,
      totalPrice,
      userId,
    };

    try {
      const response = await fetch(`${API_URL}/orderconfirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        setOrderPlaced(true);
        dispatch(clearCart());
        alert("Order placed successfully and confirmation email sent!");
      } else {
        throw new Error("Failed to send confirmation email.");
      }
    } catch (error) {
      console.error("Error placing order:", error.message);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      {!orderPlaced ? (
        <>
          <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>
          <div className="bg-white rounded-lg shadow-lg p-6">
            {cartData.length > 0 ? (
              cartData.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between border-b py-4"
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src={item.image || "https://via.placeholder.com/80"}
                      alt={item.name || "Product Image"}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        Price: ₹{item.price || "0.00"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm">Qty:</p>
                    <button
                      className="px-2 bg-gray-200 rounded-md"
                      onClick={() =>
                        handleQuantityChange(item.productId, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="font-bold text-lg">{item.quantity || 0}</span>
                    <button
                      className="px-2 bg-gray-200 rounded-md"
                      onClick={() =>
                        handleQuantityChange(item.productId, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <p className="text-lg font-semibold">
                      ₹{((item.quantity || 0) * (item.price || 0)).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center py-6">Your cart is empty.</p>
            )}
          </div>
          <div className="mt-6 bg-gray-100 rounded-lg shadow-md p-6 text-right">
            <h2 className="text-xl font-bold">
              Total Price: ₹{totalPrice.toFixed(2)}
            </h2>
          </div>
          <div className="mt-6 bg-white rounded-lg shadow-lg p-6 space-y-4">
            <input
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <button
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
            onClick={handlePlaceOrder}
            disabled={cartData.length === 0}
          >
            Place Order
          </button>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Order Confirmation</h2>
          <p className="mb-2">
            <strong>Address:</strong> {address}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {email}
          </p>
          <h3 className="text-xl font-bold mt-4 mb-2">Order Details:</h3>
          {cartData.map((item) => (
            <div key={item.productId} className="flex justify-between border-b py-2">
              <p>{item.name}</p>
              <p>
                ₹{item.price} x {item.quantity} = ₹
                {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
          <h3 className="text-xl font-bold mt-4">
            Total Price: ₹{totalPrice.toFixed(2)}
          </h3>
        </div>
      )}
      <Button className="bg-green-400 " name="button"  onClick={handleGoBack}>Go back</Button>
    </div>
  );
};

export default CartPage;
