// productActions.js
import * as actionTypes from "../actions/actionTypes";

export const setProducts = (products) => ({
  type: actionTypes.SET_PRODUCTS,
  payload: products,
});
