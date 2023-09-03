const { initialState } = require("./ProductProvider");
import produce from "immer";
import * as types from "./ProductActions";

const ProductReducers = (state = initialState, action) =>
  produce(state, (prevState) => {
    switch (action.type) {
      case types.LOAD_ALL_PRODUCTS:
        prevState.isLoading = true;
        break;
    }
  });

export default ProductReducers;
