/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";

const ProductFilterContext = createContext();

export const ProductFilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    category: "All",
  });

  const value = useMemo(() => ({ filters, setFilters }), [filters]);

  return (
    <ProductFilterContext.Provider value={value}>
      {children}
    </ProductFilterContext.Provider>
  );
};

export const useProductFilters = () => useContext(ProductFilterContext);

export default ProductFilterContext;
