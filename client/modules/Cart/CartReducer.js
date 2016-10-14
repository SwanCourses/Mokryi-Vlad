import { ADD_TO_CART, REPLACE_CART, CACHE_KEY, REMOVE_FROM_CART } from './CartActions';
import { getProduct } from '../Product/ProductReducer';

// Initial State
const initialState = {};

const CartReducer = (state = initialState, action) => {
  let newCart;
  switch (action.type) {

    case ADD_TO_CART:
      newCart = state;
      let key = action.productCuid + '=' + action.productColor + '=' + action.productSize;
      if (state[key]) {
        let product = state[key];
        newCart = {
          ...state,
          [key]: { ...product, count: product.count + 1 }
        };
      } else {
        newCart = {
          ...state,
          [key]: { count: 1 }
        }
      }

      localStorage.setItem(CACHE_KEY, JSON.stringify(newCart));
      return newCart;

    case REMOVE_FROM_CART:
      newCart = state;
      let hash = action.productCuid + '=' + action.productColor + '=' + action.productSize;
      if (state[hash]) {
        let product = state[hash];
        if (product.count < 2) {
          delete state[hash];
          newCart = { ...state }
        } else {
          newCart = {
            ...state,
          };
          newCart[hash] = { ...product, count: product.count - 1 }
        }
      }
      localStorage.setItem(CACHE_KEY, JSON.stringify(newCart));
      return newCart;

    case REPLACE_CART:
      return action.cart || state;

    default:
      return state;
  }
};

/* Selectors */

// Get all products
export const getCart = state => state.cart;

export const getProductsCount = (state) => {
  return Object.keys(state.cart).reduce((sum, key) => {
    return sum + parseFloat(state.cart[key].count);
  }, 0);
};

export const getOrdersAmount = (state) => {
  return Object.keys(state.cart).reduce((sum, key) => {
    let product = getProduct(state, key.split('=')[0]);
    if (!product) return sum;
    return sum + parseFloat(state.cart[key].count) * product.price;
  }, 0);
};

// Export Reducer
export default CartReducer;
