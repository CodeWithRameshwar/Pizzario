import API from "./api";

export const placeOrder = (data) =>
  API.post("/orders", data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
