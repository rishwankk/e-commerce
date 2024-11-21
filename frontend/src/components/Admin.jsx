import React, { useState, useEffect } from 'react';
import { API_URL } from '../constants';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/order`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setOrders(data); 
    } catch (error) {
      console.error('Error fetching orders:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center text-xl font-semibold py-8">Loading...</div>;
  }

  if (!orders.length) {
    return <div className="text-center text-xl font-semibold py-8">No orders found.</div>;
  }

  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-6">All Orders</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500">Order ID</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500">Customer Name</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500">Email</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500">Status</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500">Total Price</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500">Order Date</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500">Delivery Address</th>
              <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500">Products</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm font-medium text-gray-900">
                  {order._id}
                </td>
                <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-900">
                  {order.customer?.name || 'N/A'}
                </td>
                <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-900">{order.email}</td>
                <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-900">{order.orderStatus}</td>
                <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-900">
                  ₹{order.totalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-900">
                  {new Date(order.orderDate).toLocaleString('en-IN')}
                </td>
                <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-900">{order.deliveryAddress}</td>
                <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-gray-900">
                  {order.products.map((product) => (
                    <div key={product.product?._id || product.name} className="text-xs sm:text-sm">
                      {product.name} x {product.quantity}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
