import { ADD_PRODUCT, ADD_PRODUCTS, SET_SEARCH_QUERY, SET_FILTER_GROUP } from './ProductActions';

const GROUP1 = 'group1';
const GROUP2 = 'group2';
const GROUP3 = 'group3';

const groups = [GROUP1, GROUP2, GROUP3];
// Initial State
const initialState = { data: [], searchQuery: '', groups: groups, filterGroup: ''};

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
  return state.products.data.filter((product) => {
    if (group && name) {
      return product.group === group && `${product.name} ${product.price}`.indexOf(name) > -1;
    } else if (group) {
      return product.group === group;
    } else if (name) {
      return `${product.name} ${product.price}`.indexOf(name) > -1;
    } else {
      return true;
    }
  });
};

// Get product by cuid
export const getProduct = (state, cuid) => state.products.data.filter(product => product.cuid === cuid)[0];

// Export Reducer
export default ProductReducer;
