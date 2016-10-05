import { ADD_CATEGORIES, ADD_CATEGORY } from './CategoryActions';

// Initial State
const initialState = { data: [] };

const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {

    case ADD_CATEGORIES:
      return {
        data: action.categories,
      };
    case ADD_CATEGORY:
      return {
        ...state,
        data: [action.category, ...state.data],
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all products
export const getCategories = state => state.categories.data;

export const getCategoriesByProducts = (state, products) => {
  let categories = [];
  products.forEach(function (product) {
    if (categories.indexOf(product.category) === -1) {
      categories.push(product.category);
    }
  });
  return state.categories.data.filter(category => categories.indexOf(category.cuid) !== -1);
};

// Get product by cuid
export const getCategory = (state, cuid) => state.categories.data.filter(category => category.cuid === cuid)[0];

// Export Reducer
export default CategoryReducer;
