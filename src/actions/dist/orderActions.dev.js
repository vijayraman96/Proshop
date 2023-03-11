"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delieverOrder = exports.listOrders = exports.listMyOrders = exports.payOrder = exports.getOrderDetails = exports.createOrder = void 0;

var _orderConstant = require("../constants/orderConstant");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createOrder = function createOrder(order) {
  return function _callee(dispatch, getState) {
    var _getState, userInfo, config, _ref, data;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            dispatch({
              type: _orderConstant.ORDER_CREATE_REQUEST
            });
            _getState = getState(), userInfo = _getState.userLogin.userInfo;
            config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ".concat(userInfo.token)
              }
            };
            _context.next = 6;
            return regeneratorRuntime.awrap(_axios["default"].post("/api/order", order, config));

          case 6:
            _ref = _context.sent;
            data = _ref.data;
            dispatch({
              type: _orderConstant.ORDER_CREATE_SUCCESS,
              payload: data
            });
            _context.next = 14;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            dispatch({
              type: _orderConstant.ORDER_CREATE_FAIL,
              payload: _context.t0.response && _context.t0.response.data.message ? _context.t0.response.data.message : _context.t0.message
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 11]]);
  };
};

exports.createOrder = createOrder;

var getOrderDetails = function getOrderDetails(id) {
  return function _callee2(dispatch, getState) {
    var _getState2, userInfo, config, _ref2, data;

    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            dispatch({
              type: _orderConstant.ORDER_DETAILS_REQUEST
            });
            _getState2 = getState(), userInfo = _getState2.userLogin.userInfo;
            config = {
              headers: {
                Authorization: "Bearer ".concat(userInfo.token)
              }
            };
            _context2.next = 6;
            return regeneratorRuntime.awrap(_axios["default"].get("/api/order/".concat(id), config));

          case 6:
            _ref2 = _context2.sent;
            data = _ref2.data;
            dispatch({
              type: _orderConstant.ORDER_DETAILS_SUCCESS,
              payload: data
            });
            _context2.next = 14;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](0);
            dispatch({
              type: _orderConstant.ORDER_DETAILS_FAIL,
              payload: _context2.t0.response && _context2.t0.response.data.message ? _context2.t0.response.data.message : _context2.t0.message
            });

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 11]]);
  };
};

exports.getOrderDetails = getOrderDetails;

var payOrder = function payOrder(orderId, paymentResult) {
  return function _callee3(dispatch, getState) {
    var _getState3, userInfo, config, _ref3, data;

    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log('paymentResult', paymentResult, orderId);
            _context3.prev = 1;
            dispatch({
              type: _orderConstant.ORDER_PAY_REQUEST
            });
            _getState3 = getState(), userInfo = _getState3.userLogin.userInfo;
            config = {
              headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer ".concat(userInfo.token)
              }
            };
            _context3.next = 7;
            return regeneratorRuntime.awrap(_axios["default"].put("/api/order/".concat(orderId.id, "/pay"), paymentResult, config));

          case 7:
            _ref3 = _context3.sent;
            data = _ref3.data;
            dispatch({
              type: _orderConstant.ORDER_PAY_SUCCESS,
              payload: data
            });
            _context3.next = 15;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](1);
            dispatch({
              type: _orderConstant.ORDER_PAY_FAIL,
              payload: _context3.t0.response && _context3.t0.response.data.message ? _context3.t0.response.data.message : _context3.t0.message
            });

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[1, 12]]);
  };
};

exports.payOrder = payOrder;

var listMyOrders = function listMyOrders() {
  return function _callee4(dispatch, getState) {
    var _getState4, userInfo, config, _ref4, data;

    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            dispatch({
              type: _orderConstant.ORDER_LIST_MY_REQUEST
            });
            _getState4 = getState(), userInfo = _getState4.userLogin.userInfo;
            config = {
              headers: {
                Authorization: "Bearer ".concat(userInfo.token)
              }
            };
            _context4.next = 6;
            return regeneratorRuntime.awrap(_axios["default"].get("/api/order/myOrders", config));

          case 6:
            _ref4 = _context4.sent;
            data = _ref4.data;
            dispatch({
              type: _orderConstant.ORDER_LIST_MY_SUCCESS,
              payload: data
            });
            _context4.next = 14;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](0);
            dispatch({
              type: _orderConstant.ORDER_LIST_MY_FAIL,
              payload: _context4.t0.response && _context4.t0.response.data.message ? _context4.t0.response.data.message : _context4.t0.message
            });

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 11]]);
  };
};

exports.listMyOrders = listMyOrders;

var listOrders = function listOrders() {
  return function _callee5(dispatch, getState) {
    var _getState5, userInfo, config, _ref5, data;

    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            dispatch({
              type: _orderConstant.ORDER_LIST_REQUEST
            });
            _getState5 = getState(), userInfo = _getState5.userLogin.userInfo;
            config = {
              headers: {
                Authorization: "Bearer ".concat(userInfo.token)
              }
            };
            _context5.next = 6;
            return regeneratorRuntime.awrap(_axios["default"].get("/api/order", config));

          case 6:
            _ref5 = _context5.sent;
            data = _ref5.data;
            dispatch({
              type: _orderConstant.ORDER_LIST_SUCCESS,
              payload: data
            });
            _context5.next = 14;
            break;

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](0);
            dispatch({
              type: _orderConstant.ORDER_LIST_FAIL,
              payload: _context5.t0.response && _context5.t0.response.data.message ? _context5.t0.response.data.message : _context5.t0.message
            });

          case 14:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 11]]);
  };
};

exports.listOrders = listOrders;

var delieverOrder = function delieverOrder(order) {
  return function _callee6(dispatch, getState) {
    var _getState6, userInfo, config, _ref6, data;

    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            dispatch({
              type: _orderConstant.ORDER_DELIEVER_REQUEST
            });
            _getState6 = getState(), userInfo = _getState6.userLogin.userInfo;
            config = {
              headers: {
                Authorization: "Bearer ".concat(userInfo.token)
              }
            };
            _context6.next = 6;
            return regeneratorRuntime.awrap(_axios["default"].put("/api/order/".concat(order._id, "/deliever"), {}, config));

          case 6:
            _ref6 = _context6.sent;
            data = _ref6.data;
            console.log('deliever', data);
            dispatch({
              type: _orderConstant.ORDER_DELIEVER_SUCCESS,
              payload: data
            });
            _context6.next = 15;
            break;

          case 12:
            _context6.prev = 12;
            _context6.t0 = _context6["catch"](0);
            dispatch({
              type: _orderConstant.ORDER_DELIEVER_FAIL,
              payload: _context6.t0.response && _context6.t0.response.data.message ? _context6.t0.response.data.message : _context6.t0.message
            });

          case 15:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[0, 12]]);
  };
};

exports.delieverOrder = delieverOrder;