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

  // Toggle veggie selection
  const toggleVeggie = (veg) => {
    setVeggies(prev =>
      prev.includes(veg)
        ? prev.filter(v => v !== veg)
        : [...prev, veg]
    );
  };

  // Button style for selected options
  const buttonStyle = (selected, value) => ({
    margin: "5px",
    padding: "8px",
    backgroundColor: selected === value ? "#4caf50" : "#eee",
    color: selected === value ? "white" : "black",
    border: "none",
    cursor: "pointer"
  });

  const basePrices = {
  Thin: 0,
  "Cheese Burst": 50,
  "Whole Wheat": 30,
  Classic: 0,
  "Gluten Free": 40
};

const saucePrices = {
  Tomato: 0,
  BBQ: 20,
  Pesto: 30,
  Alfredo: 25,
  Spicy: 15
};

const cheesePrices = {
  Mozzarella: 30,
  Cheddar: 40,
  Parmesan: 50
};

const veggiePrice = 20;

const totalPrice =
  pizza.price +
  (base ? basePrices[base] : 0) +
  (sauce ? saucePrices[sauce] : 0) +
  (cheese ? cheesePrices[cheese] : 0) +
  veggies.length * veggiePrice;


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

      {/* Base */}
      <h4>Choose Base</h4>
      {["Thin", "Cheese Burst", "Whole Wheat", "Classic", "Gluten Free"].map(b => (
        <button
          key={b}
          style={buttonStyle(base, b)}
          onClick={() => setBase(b)}
        >
          {b}
        </button>
      ))}
      <p><b>Selected Base:</b> {base || "None"}</p>

      {/* Sauce */}
      <h4>Choose Sauce</h4>
      {["Tomato", "BBQ", "Pesto", "Alfredo", "Spicy"].map(s => (
        <button
          key={s}
          style={buttonStyle(sauce, s)}
          onClick={() => setSauce(s)}
        >
          {s}
        </button>
      ))}
      <p><b>Selected Sauce:</b> {sauce || "None"}</p>

      {/* Cheese */}
      <h4>Choose Cheese</h4>
      {["Mozzarella", "Cheddar", "Parmesan"].map(c => (
        <button
          key={c}
          style={buttonStyle(cheese, c)}
          onClick={() => setCheese(c)}
        >
          {c}
        </button>
      ))}
      <p><b>Selected Cheese:</b> {cheese || "None"}</p>

      {/* Veggies */}
      <h4>Veggies</h4>
      {["Onion", "Capsicum", "Olives", "Corn", "Mushroom"].map(v => (
        <label key={v} style={{ marginRight: "10px" }}>
          <input
            type="checkbox"
            checked={veggies.includes(v)}
            onChange={() => toggleVeggie(v)}
          />
          {v}
        </label>
      ))}
      <p><b>Selected Veggies:</b> {veggies.length ? veggies.join(", ") : "None"}</p>

      <h3>Total Price: ₹{totalPrice}</h3>

      <button onClick={handleOrder}>Place Order</button>
    </div>
  );
};

export default PizzaBuilder;
