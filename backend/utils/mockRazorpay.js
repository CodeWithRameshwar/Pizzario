export const createMockOrder = (amount) => {
  return {
    id: "order_mock_" + Date.now(),
    amount: amount * 100,
    currency: "INR",
    status: "created"
  };
};

export const verifyMockPayment = () => {
  return {
    paymentId: "pay_mock_" + Date.now(),
    status: "success"
  };
};
