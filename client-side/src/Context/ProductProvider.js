import { useMemo, useReducer } from "react";
import ProductReducers from "./ProductReducer";
import * as types from "./ProductActions";
import { ProductContext } from "./ProductContext";
import { Api } from "../utils/Api";

export const initialState = {
  isLoading: false,
  error: "",
  products: [],
};

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducers, initialState);

  const loadAllProducts = async (payload) => {
    dispatch({ type: types.LOAD_ALL_PRODUCTS });

    const res = await Api(
      "/products",
      dispatch,
      types.LOAD_ALL_PRODUCTS_SUCCESS,
      types.LOAD_ALL_PRODUCTS_FAILURE
    );
  };

  const contextValue = useMemo(() => {
    return loadAllProducts;
  }, [state]);

  return (
    <ProductContext.Provider value={{ ...contextValue }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
