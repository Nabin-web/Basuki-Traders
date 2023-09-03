import { createContext, useContext } from "react";

export const ProductContext = createContext();

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("Context hooks must be within the provider");
  }
  return context;
};
