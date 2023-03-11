import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_ERROR,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_ERROR,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_ERROR,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_ERROR,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_ERROR,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_ERROR,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_TOP_ERROR,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_REQUEST,
} from "../constants/productConstants";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload.products, pages: action.payload.pages, page:action.payload.page };
    case PRODUCT_LIST_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productDetailsReducer = (
  state = { product: { } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true};
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productDeleteReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productCreateReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_ERROR:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {  };
    default:
      return state;
  }
};
export const productUpdateReducer = (
  state = {product: {}},
  action
) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_ERROR:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const productReviewCreateReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true};
    case PRODUCT_CREATE_REVIEW_ERROR:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_REVIEW_RESET:
      return { };
    default:
      return state;
  }
};
export const productTopRatedReducer = (
  state = {products: []},
  action
) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload};
    case PRODUCT_TOP_ERROR:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};






