import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const customerId = 1; // Replace with actual customer ID

  useEffect(() => {
    axios.get(`https://online-book-ukfw.onrender.com/api/orders/customer/${customerId}`)
      .then(res => {
        setOrders(res.data);
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
      });
  }, [customerId]);

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <h3>Order ID: {order.id}</h3>
            <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
            <ul>
              {order.OrderDetails.map(detail => (
                <li key={detail.bookId}>Book ID: {detail.bookId}, Quantity: {detail.quantity}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Order;
