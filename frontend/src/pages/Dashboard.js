import { useEffect, useState } from "react";
import { getPizzas } from "../api/pizzaApi";
import PizzaCard from "../components/PizzaCard";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [pizzas, setPizzas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getPizzas()
      .then(res => setPizzas(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleSelect = (pizza) => {
    navigate("/build", { state: { pizza } });
  };

  return (
    <div>
      <Navbar />
      <h3>🍕 Available Pizzas</h3>

      {pizzas.map(pizza => (
        <PizzaCard
          key={pizza._id}
          pizza={pizza}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
};

export default Dashboard;
