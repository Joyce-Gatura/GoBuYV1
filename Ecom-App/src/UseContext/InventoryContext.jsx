/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

const DEFAULT_STOCK = 10;
const InventoryContext = createContext();

export const getProductKey = (product) =>
  `${product.id}-${product.name}-${product.img || product.image || product.picture_url || ""}`;

export const InventoryProvider = ({ children }) => {
  const [stockByProduct, setStockByProduct] = useState({});

  const getStock = (product) => stockByProduct[getProductKey(product)] ?? product.stock ?? DEFAULT_STOCK;

  const decrementStock = (items) => {
    const canFulfill = items.every((item) => getStock(item) >= item.quantity);
    if (!canFulfill) return false;

    setStockByProduct((currentStock) => {
      const nextStock = { ...currentStock };
      items.forEach((item) => {
        const key = getProductKey(item);
        nextStock[key] = getStock(item) - item.quantity;
      });
      return nextStock;
    });
    return true;
  };

  const value = { getStock, decrementStock };

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
};

export const useInventory = () => useContext(InventoryContext);

export default InventoryContext;
