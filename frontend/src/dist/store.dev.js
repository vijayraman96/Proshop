"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _reduxDevtoolsExtension = require("redux-devtools-extension");

var _productReducers = require("./reducers/productReducers");

var _cartReducer = require("./reducers/cartReducer");

var _loginReducer = require("./reducers/loginReducer");

var _orderReducers = require("./reducers/orderReducers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var reducer = (0, _redux.combineReducers)({
  productList: _productReducers.productListReducer,
  productDetail: _productReducers.productDetailsReducer,
  cart: _cartReducer.cartReducer,
  userLogin: _loginReducer.userLoginReducer,
  userRegister: _loginReducer.userRegisterReducer,
  userDetails: _loginReducer.userDetailsReducer,
  userUpdateProfile: _loginReducer.userUpdateProfileReducer,
  userDelete: _loginReducer.userDeleteReducer,
  userUpdate: _loginReducer.userUpdateReducer,
  userList: _loginReducer.userListReducer,
  orderCreate: _orderReducers.orderCreateReducer,
  orderDetails: _orderReducers.orderDetailsReducer,
  orderPay: _orderReducers.orderPayReducer,
  orderListMy: _orderReducers.orderListMyReducer
});
var cartItemsFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
var userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;
var shippingAddressFromStorage = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {};
console.log(shippingAddressFromStorage);
var initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage
  },
  userLogin: {
    userInfo: userInfoFromStorage
  }
};
var middleware = [_reduxThunk["default"]];
var store = (0, _redux.createStore)(reducer, initialState, (0, _reduxDevtoolsExtension.composeWithDevTools)(_redux.applyMiddleware.apply(void 0, middleware)));
var _default = store;
exports["default"] = _default;