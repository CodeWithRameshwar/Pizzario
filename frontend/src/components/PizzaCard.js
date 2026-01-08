const PizzaCard = ({ pizza, onSelect }) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h4>{pizza.name}</h4>
      <p>Category: {pizza.category}</p>
      <p>Price: ₹{pizza.price}</p>
      <button onClick={() => onSelect(pizza)}>Customize</button>
    </div>
  );
};

export default PizzaCard;
