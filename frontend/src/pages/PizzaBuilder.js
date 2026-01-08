import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { placeOrder } from "../api/orderApi";

const PizzaBuilder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pizza = location.state?.pizza;

  const [base, setBase] = useState("");
  const [sauce, setSauce] = useState("");
  const [cheese, setCheese] = useState("");
  const [veggies, setVeggies] = useState([]);

  if (!pizza) return <h3>No pizza selected</h3>;

  const toggleVeggie = (veg) => {
    setVeggies(prev =>
      prev.includes(veg)
        ? prev.filter(v => v !== veg)
        : [...prev, veg]
    );
  };

  const totalPrice = pizza.price + veggies.length * 20;

  const handleOrder = async () => {
    try {
      const res = await placeOrder({
        pizza: {
          ...pizza,
          base,
          sauce,
          cheese,
          veggies
        },
        totalPrice
      });

      navigate("/payment", { state: { orderId: res.data._id } });
    } catch (err) {
      alert("Order failed");
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Customize {pizza.name}</h2>

      <h4>Choose Base</h4>
      {["Thin", "Cheese Burst", "Whole Wheat", "Classic", "Gluten Free"].map(b => (
        <button key={b} onClick={() => setBase(b)}>
          {b}
        </button>
      ))}

      <h4>Choose Sauce</h4>
      {["Tomato", "BBQ", "Pesto", "Alfredo", "Spicy"].map(s => (
        <button key={s} onClick={() => setSauce(s)}>
          {s}
        </button>
      ))}

      <h4>Choose Cheese</h4>
      {["Mozzarella", "Cheddar", "Parmesan"].map(c => (
        <button key={c} onClick={() => setCheese(c)}>
          {c}
        </button>
      ))}

      <h4>Veggies</h4>
      {["Onion", "Capsicum", "Olives", "Corn", "Mushroom"].map(v => (
        <label key={v}>
          <input type="checkbox" onChange={() => toggleVeggie(v)} />
          {v}
        </label>
      ))}

      <h3>Total Price: ₹{totalPrice}</h3>

      <button onClick={handleOrder}>Place Order</button>
    </div>
  );
};

export default PizzaBuilder;
