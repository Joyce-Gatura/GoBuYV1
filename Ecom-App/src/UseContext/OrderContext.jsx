/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = (order) => {
    setOrders((prev) => [
      {
        id: `ORD-${Date.now()}`,
        ...order,
        status: "pending",
        progress: 1,
      },
      ...prev,
    ]);
  };

  const updateOrderStatus = (id, status, progress) => {
    setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, status, progress } : order)));
  };

  const value = useMemo(() => ({ orders, addOrder, updateOrderStatus }), [orders]);

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrders = () => useContext(OrderContext);

export default OrderContext;
