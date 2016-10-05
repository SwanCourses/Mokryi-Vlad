import callApi, { callApiForm } from '../../util/apiCaller';

export const ADD_PRODUCTS = 'ADD_PRODUCTS';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const SET_FILTER_GROUP = 'SET_FILTER_GROUP';
export const SET_FILTER_CATEGORY = 'SET_FILTER_CATEGORY';
export const RESET_FILTERS = 'RESET_FILTERS';
import { browserHistory } from 'react-router';

export function addProducts(products) {
  return {
    type: ADD_PRODUCTS,
    products,
  };
}

export function addProduct(product) {
  return {
    type: ADD_PRODUCT,
    product,
  };
}

export function setSearchQuery(searchQuery) {
  return {
    type: SET_SEARCH_QUERY,
    searchQuery,
  };
}

export function setFilterGroup(filterGroup) {
  return {
    type: SET_FILTER_GROUP,
    filterGroup,
  };
}

export function setFilterCategory(filterCategory) {
  return {
    type: SET_FILTER_CATEGORY,
    filterCategory,
  };
}

export function resetFilters() {
  return {
    type: RESET_FILTERS
  };
}

export function fetchProducts() {
  return (dispatch) => {
    return callApi('products').then(res => {
      dispatch(addProducts(res.products));
    });
  };
}

export function addProductRequest(form) {
  return (dispatch) => {
    return callApiForm('products', 'post', form).then(res => {
      dispatch(addProduct(res.product));
      browserHistory.push('/products/'+res.product.cuid)
    });
  };
}
