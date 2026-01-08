import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../api/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await API.get("/admin/orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(
      `/admin/orders/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }
    );
    fetchOrders();
  };

  return (
    <div>
      <Navbar />
      <h2>Admin Orders</h2>

      {orders.map(order => (
        <div key={order._id} style={{ border: "1px solid #ccc", margin: "10px" }}>
          <p>Pizza: {order.pizza.name}</p>
          <p>Status: {order.status}</p>

          <button onClick={() => updateStatus(order._id, "Order Received")}>
            Order Received
          </button>
          <button onClick={() => updateStatus(order._id, "In the Kitchen")}>
            In the Kitchen
          </button>
          <button onClick={() => updateStatus(order._id, "Sent to Delivery")}>
            Sent to Delivery
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
