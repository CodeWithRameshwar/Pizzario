import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h2>🍕 Pizzario</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Navbar;
