import { ADD_PRODUCT, ADD_PRODUCTS, SET_SEARCH_QUERY, SET_FILTER_GROUP } from './ProductActions';

const GROUP1 = 'group1';
const GROUP2 = 'group2';
const GROUP3 = 'group3';

const groups = [GROUP1, GROUP2, GROUP3];

const COLOR_WHITE = 'white';
const COLOR_RED = 'red';
const COLOR_BLUE = 'blue';
const COLOR_GREEN = 'green';
const COLOR_BLACK = 'black';
const colors = [COLOR_WHITE, COLOR_RED, COLOR_BLUE, COLOR_GREEN, COLOR_BLACK];
// Initial State
const initialState = { data: [], searchQuery: '', groups: groups, colors: colors, filterGroup: ''};

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

    case SET_FILTER_GROUP:
      return {
        ...state,
        filterGroup: action.filterGroup
      };

    default:
      return state;
  }
};

/* Selectors */

// Get products
export const getProducts = (state, name = '', group = '') => {
  name = name.trim();
  if (name === '' && group === '') {
    return state.products.data
  } else if (name === '') {
    return state.products.data.filter(product => product.group === group)
  } else if (group === '') {
    return state.products.data.filter(product => `${product.name} ${product.price}`.indexOf(name) > -1)
  } else {
    return state.products.data.filter(product => `${product.name} ${product.price}`.indexOf(name) > -1 && product.group === group)
  }
};

// Get product by cuid
export const getProduct = (state, cuid) => state.products.data.filter(product => product.cuid === cuid)[0];

// Export Reducer
export default ProductReducer;
