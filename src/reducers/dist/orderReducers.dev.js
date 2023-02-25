"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderListMyReducer = exports.orderPayReducer = exports.orderDetailsReducer = exports.orderCreateReducer = void 0;

var _orderConstant = require("../constants/orderConstant");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var orderCreateReducer = function orderCreateReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    products: []
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _orderConstant.ORDER_CREATE_REQUEST:
      return {
        loading: true
      };

    case _orderConstant.ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload
      };

    case _orderConstant.ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

exports.orderCreateReducer = orderCreateReducer;

var orderDetailsReducer = function orderDetailsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    loading: true,
    orderItems: [],
    shippingAddress: {}
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _orderConstant.ORDER_DETAILS_REQUEST:
      return _objectSpread({}, state, {
        loading: true
      });

    case _orderConstant.ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload
      };

    case _orderConstant.ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

exports.orderDetailsReducer = orderDetailsReducer;

var orderPayReducer = function orderPayReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _orderConstant.ORDER_PAY_REQUEST:
      return {
        loading: true
      };

    case _orderConstant.ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true
      };

    case _orderConstant.ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload
      };

    case _orderConstant.ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};

exports.orderPayReducer = orderPayReducer;

var orderListMyReducer = function orderListMyReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    orders: []
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _orderConstant.ORDER_LIST_MY_REQUEST:
      return {
        loading: true
      };

    case _orderConstant.ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload
      };

    case _orderConstant.ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload
      };

    case _orderConstant.ORDER_LIST_MY_RESET:
      return {
        orders: []
      };

    default:
      return state;
  }
};

exports.orderListMyReducer = orderListMyReducer;