"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productTopRatedReducer = exports.productReviewCreateReducer = exports.productUpdateReducer = exports.productCreateReducer = exports.productDeleteReducer = exports.productDetailsReducer = exports.productListReducer = void 0;

var _productConstants = require("../constants/productConstants");

var productListReducer = function productListReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    products: []
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _productConstants.PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        products: []
      };

    case _productConstants.PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page
      };

    case _productConstants.PRODUCT_LIST_ERROR:
      return {
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

exports.productListReducer = productListReducer;

var productDetailsReducer = function productDetailsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    product: {}
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _productConstants.PRODUCT_DETAILS_REQUEST:
      return {
        loading: true
      };

    case _productConstants.PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload
      };

    case _productConstants.PRODUCT_DETAILS_ERROR:
      return {
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

exports.productDetailsReducer = productDetailsReducer;

var productDeleteReducer = function productDeleteReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _productConstants.PRODUCT_DELETE_REQUEST:
      return {
        loading: true
      };

    case _productConstants.PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true
      };

    case _productConstants.PRODUCT_DELETE_ERROR:
      return {
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

exports.productDeleteReducer = productDeleteReducer;

var productCreateReducer = function productCreateReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _productConstants.PRODUCT_CREATE_REQUEST:
      return {
        loading: true
      };

    case _productConstants.PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload
      };

    case _productConstants.PRODUCT_CREATE_ERROR:
      return {
        loading: false,
        error: action.payload
      };

    case _productConstants.PRODUCT_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

exports.productCreateReducer = productCreateReducer;

var productUpdateReducer = function productUpdateReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    product: {}
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _productConstants.PRODUCT_UPDATE_REQUEST:
      return {
        loading: true
      };

    case _productConstants.PRODUCT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: action.payload
      };

    case _productConstants.PRODUCT_UPDATE_ERROR:
      return {
        loading: false,
        error: action.payload
      };

    case _productConstants.PRODUCT_UPDATE_RESET:
      return {
        product: {}
      };

    default:
      return state;
  }
};

exports.productUpdateReducer = productUpdateReducer;

var productReviewCreateReducer = function productReviewCreateReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _productConstants.PRODUCT_CREATE_REVIEW_REQUEST:
      return {
        loading: true
      };

    case _productConstants.PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true
      };

    case _productConstants.PRODUCT_CREATE_REVIEW_ERROR:
      return {
        loading: false,
        error: action.payload
      };

    case _productConstants.PRODUCT_CREATE_REVIEW_RESET:
      return {};

    default:
      return state;
  }
};

exports.productReviewCreateReducer = productReviewCreateReducer;

var productTopRatedReducer = function productTopRatedReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    products: []
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _productConstants.PRODUCT_TOP_REQUEST:
      return {
        loading: true,
        products: []
      };

    case _productConstants.PRODUCT_TOP_SUCCESS:
      return {
        loading: false,
        products: action.payload
      };

    case _productConstants.PRODUCT_TOP_ERROR:
      return {
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

exports.productTopRatedReducer = productTopRatedReducer;