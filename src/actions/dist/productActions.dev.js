"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listTopProducts = exports.createProductReview = exports.updateProduct = exports.createProduct = exports.deleteProduct = exports.listProductDetail = exports.listProducts = void 0;

var _productConstants = require("../constants/productConstants");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var listProducts = function listProducts(url) {
  return function _callee(dispatch) {
    var _ref, data;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(url);
            _context.prev = 1;
            dispatch({
              type: _productConstants.PRODUCT_LIST_REQUEST
            });
            _context.next = 5;
            return regeneratorRuntime.awrap(_axios["default"].get("/api/products?url=".concat(url)));

          case 5:
            _ref = _context.sent;
            data = _ref.data;
            dispatch({
              type: _productConstants.PRODUCT_LIST_SUCCESS,
              payload: data
            });
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            dispatch({
              type: _productConstants.PRODUCT_LIST_ERROR,
              payload: _context.t0.response && _context.t0.response.data.message ? _context.t0.response.data.message : _context.t0.message
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[1, 10]]);
  };
};

exports.listProducts = listProducts;

var listProductDetail = function listProductDetail(id) {
  return function _callee2(dispatch) {
    var _ref2, data;

    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            dispatch({
              type: _productConstants.PRODUCT_DETAILS_REQUEST
            });
            _context2.next = 4;
            return regeneratorRuntime.awrap(_axios["default"].get("/api/products/".concat(id)));

          case 4:
            _ref2 = _context2.sent;
            data = _ref2.data;
            dispatch({
              type: _productConstants.PRODUCT_DETAILS_SUCCESS,
              payload: data
            });
            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            dispatch({
              type: _productConstants.PRODUCT_DETAILS_ERROR,
              payload: _context2.t0.response && _context2.t0.response.data.message ? _context2.t0.response.data.message : _context2.t0.message
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 9]]);
  };
};

exports.listProductDetail = listProductDetail;

var deleteProduct = function deleteProduct(id) {
  return function _callee3(dispatch, getState) {
    var _getState, userInfo, config;

    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            dispatch({
              type: _productConstants.PRODUCT_DELETE_REQUEST
            });
            _getState = getState(), userInfo = _getState.userLogin.userInfo;
            config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ".concat(userInfo.token)
              }
            };
            _context3.next = 6;
            return regeneratorRuntime.awrap(_axios["default"]["delete"]("/api/products/".concat(id), config));

          case 6:
            dispatch({
              type: _productConstants.PRODUCT_DELETE_SUCCESS
            });
            _context3.next = 12;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            dispatch({
              type: _productConstants.PRODUCT_DELETE_ERROR,
              payload: _context3.t0.response && _context3.t0.response.data.message ? _context3.t0.response.data.message : _context3.t0.message
            });

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 9]]);
  };
};

exports.deleteProduct = deleteProduct;

var createProduct = function createProduct() {
  return function _callee4(dispatch, getState) {
    var _getState2, userInfo, config, _ref3, data;

    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            dispatch({
              type: _productConstants.PRODUCT_CREATE_REQUEST
            });
            _getState2 = getState(), userInfo = _getState2.userLogin.userInfo;
            config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ".concat(userInfo.token)
              }
            };
            _context4.next = 6;
            return regeneratorRuntime.awrap(_axios["default"].post("/api/products", {}, config));

          case 6:
            _ref3 = _context4.sent;
            data = _ref3.data;
            dispatch({
              type: _productConstants.PRODUCT_CREATE_SUCCESS,
              payload: data
            });
            _context4.next = 14;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4["catch"](0);
            dispatch({
              type: _productConstants.PRODUCT_CREATE_ERROR,
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

exports.createProduct = createProduct;

var updateProduct = function updateProduct(product) {
  return function _callee5(dispatch, getState) {
    var _getState3, userInfo, config, _ref4, data;

    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            dispatch({
              type: _productConstants.PRODUCT_UPDATE_REQUEST
            });
            _getState3 = getState(), userInfo = _getState3.userLogin.userInfo;
            config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ".concat(userInfo.token)
              }
            };
            _context5.next = 6;
            return regeneratorRuntime.awrap(_axios["default"].put("/api/products/".concat(product._id), product, config));

          case 6:
            _ref4 = _context5.sent;
            data = _ref4.data;
            dispatch({
              type: _productConstants.PRODUCT_UPDATE_SUCCESS,
              payload: data
            });
            _context5.next = 14;
            break;

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](0);
            dispatch({
              type: _productConstants.PRODUCT_CREATE_ERROR,
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

exports.updateProduct = updateProduct;

var createProductReview = function createProductReview(productId, review) {
  return function _callee6(dispatch, getState) {
    var _getState4, userInfo, config;

    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            dispatch({
              type: _productConstants.PRODUCT_CREATE_REVIEW_REQUEST
            });
            _getState4 = getState(), userInfo = _getState4.userLogin.userInfo;
            config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ".concat(userInfo.token)
              }
            };
            _context6.next = 6;
            return regeneratorRuntime.awrap(_axios["default"].post("/api/products/".concat(productId, "/reviews"), review, config));

          case 6:
            dispatch({
              type: _productConstants.PRODUCT_CREATE_REVIEW_SUCCESS
            });
            _context6.next = 12;
            break;

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](0);
            dispatch({
              type: _productConstants.PRODUCT_CREATE_REVIEW_ERROR,
              payload: _context6.t0.response && _context6.t0.response.data.message ? _context6.t0.response.data.message : _context6.t0.message
            });

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[0, 9]]);
  };
};

exports.createProductReview = createProductReview;

var listTopProducts = function listTopProducts() {
  return function _callee7(dispatch) {
    var _ref5, data;

    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            dispatch({
              type: _productConstants.PRODUCT_TOP_REQUEST
            });
            _context7.next = 4;
            return regeneratorRuntime.awrap(_axios["default"].get("/api/products/top"));

          case 4:
            _ref5 = _context7.sent;
            data = _ref5.data;
            console.log(data);
            dispatch({
              type: _productConstants.PRODUCT_TOP_SUCCESS,
              payload: data
            });
            _context7.next = 13;
            break;

          case 10:
            _context7.prev = 10;
            _context7.t0 = _context7["catch"](0);
            dispatch({
              type: _productConstants.PRODUCT_TOP_ERROR,
              payload: _context7.t0.response && _context7.t0.response.data.message ? _context7.t0.response.data.message : _context7.t0.message
            });

          case 13:
          case "end":
            return _context7.stop();
        }
      }
    }, null, null, [[0, 10]]);
  };
};

exports.listTopProducts = listTopProducts;