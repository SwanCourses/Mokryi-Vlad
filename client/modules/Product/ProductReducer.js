import { ADD_PRODUCT, ADD_PRODUCTS, SET_SEARCH_QUERY, SET_FILTER_CATEGORY } from './ProductActions';

const categories = ['cat1', 'cat2', 'cat3'];
// Initial State
const initialState = { data: [], searchQuery: '', categories: categories, filterCategory: ''};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_PRODUCTS:
      return {
        ...state,
        data: action.products,
      };

    case ADD_PRODUCT:
      return {
        ...state,
        data: [action.product, ...state.data],
      };

    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.searchQuery
      };

    case SET_FILTER_CATEGORY:
      return {
        ...state,
        filterCategory: action.filterCategory
      };

    default:
      return state;
  }
};

/* Selectors */

// Get products
export const getProducts = (state, name = '', category = '') => {
  name = name.trim();
  let products = state.products.data;
  if (category) {
    products = products.filter(product => product.category === category);
  }
  if (name) {
    products = products.filter(product =>  `${product.name} ${product.price}`.indexOf(name) > -1);
  }
  return products;
};

// Get product by cuid
export const getProduct = (state, cuid) => state.products.data.filter(product => product.cuid === cuid)[0];

// Export Reducer
export default ProductReducer;
