"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.savePaymentMethod = exports.saveShippingAddress = exports.removeFromCart = exports.addToCart = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _cartConstant = require("../constants/cartConstant");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var addToCart = function addToCart(id, qty) {
  return function _callee(dispatch, getState) {
    var _ref, data;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(_axios["default"].get("/api/products/".concat(id)));

          case 2:
            _ref = _context.sent;
            data = _ref.data;
            dispatch({
              type: _cartConstant.CART_ADD_ITEM,
              payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty: qty
              }
            });
            localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    });
  };
};

exports.addToCart = addToCart;

var removeFromCart = function removeFromCart(id) {
  return function (dispatch, getState) {
    dispatch({
      type: _cartConstant.CART_REMOVE_ITEM,
      payload: id
    });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
  };
};

exports.removeFromCart = removeFromCart;

var saveShippingAddress = function saveShippingAddress(data) {
  return function (dispatch) {
    dispatch({
      type: _cartConstant.CART_SAVE_SHIPPING_ADDRESS,
      payload: data
    });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  };
};

exports.saveShippingAddress = saveShippingAddress;

var savePaymentMethod = function savePaymentMethod(data) {
  return function (dispatch) {
    dispatch({
      type: _cartConstant.CART_SAVE_PAYMENT_METHOD,
      payload: data
    });
    localStorage.setItem('paymentMethod', JSON.stringify(data));
  };
};

exports.savePaymentMethod = savePaymentMethod;