import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders/my", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(res => setOrders(res.data));
  }, []);

  return (
    <div>
      <Navbar />
      <h2>My Orders</h2>

      {orders.map(order => (
        <div key={order._id}>
          <p>{order.pizza.name}</p>
          <p>Status: {order.status}</p>
          <p>Payment: {order.paymentStatus}</p>
        </div>
      ))}
    </div>
  );
};

export default Orders;
