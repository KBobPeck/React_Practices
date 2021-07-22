import React, { useState, useEffect, useContext } from "react";
import reducer from "../reducers/cart-reducer";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_ERROR,
  GET_SINGLE_PRODUCT_SUCCESS,
} from "../actions";

const initialState = {};
const ProductsContext = React.createContext();

const productsProvider = ({ children }) => {
  <ProductsContext.Provider
    value={{
      this: "ping",
    }}
  >
    {children}
  </ProductsContext.Provider>;
};

export const useProductsContext = () => {
  return useContext(ProductsContext);
};
