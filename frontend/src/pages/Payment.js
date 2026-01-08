import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../api/api";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const orderId = state?.orderId;

  if (!orderId) return <h3>No order found</h3>;

  const handlePayment = async () => {
    try {
      await API.post("/payments/confirm", {
        orderId
      });

      alert("Payment confirmed successfully");
      navigate("/orders");
    } catch (err) {
      alert("Payment failed");
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Mock Payment</h2>
      <p>Order ID: {orderId}</p>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Payment;
