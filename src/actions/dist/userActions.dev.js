"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.deleteUser = exports.listUsers = exports.updateUserProfile = exports.getUserDetails = exports.register = exports.logout = exports.login = void 0;

var _userConstant = require("../constants/userConstant");

var _orderConstant = require("../constants/orderConstant");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var login = function login(email, password) {
  return function _callee(dispatch) {
    var config, _ref, data;

    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            dispatch({
              type: _userConstant.USER_LOGIN_REQUEST
            });
            config = {
              headers: {
                "Content-Type": "application/json"
              }
            };
            _context.next = 5;
            return regeneratorRuntime.awrap(_axios["default"].post("/api/users/login", {
              email: email,
              password: password
            }, config));

          case 5:
            _ref = _context.sent;
            data = _ref.data;
            dispatch({
              type: _userConstant.USER_LOGIN_SUCCESS,
              payload: data
            });
            console.log(email, password);
            localStorage.setItem("userInfo", JSON.stringify(data));
            _context.next = 16;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            dispatch({
              type: _userConstant.USER_LOGIN_FAIL,
              payload: _context.t0.response && _context.t0.response.data.message ? _context.t0.response.data.message : _context.t0.message
            });
            console.log(_context.t0);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 12]]);
  };
};

exports.login = login;

var logout = function logout() {
  return function (dispatch) {
    localStorage.removeItem("userInfo");
    dispatch({
      type: _userConstant.USER_LOGOUT
    });
    dispatch({
      type: _userConstant.USER_DETAILS_RESET
    });
    dispatch({
      type: _orderConstant.ORDER_LIST_MY_RESET
    });
    dispatch({
      type: _userConstant.USER_LIST_RESET
    });
  };
};

exports.logout = logout;

var register = function register(name, email, password) {
  return function _callee2(dispatch) {
    var config, _ref2, data;

    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            dispatch({
              type: _userConstant.USER_REGISTER_REQUEST
            });
            config = {
              headers: {
                "Content-Type": "application/json"
              }
            };
            _context2.next = 5;
            return regeneratorRuntime.awrap(_axios["default"].post("/api/users", {
              name: name,
              email: email,
              password: password
            }, config));

          case 5:
            _ref2 = _context2.sent;
            data = _ref2.data;
            dispatch({
              type: _userConstant.USER_REGISTER_SUCCESS,
              payload: data
            });
            dispatch({
              type: _userConstant.USER_LOGIN_SUCCESS,
              payload: data
            });
            console.log(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            dispatch({
              type: _userConstant.USER_REGISTER_FAIL,
              payload: _context2.t0.response && _context2.t0.response.data.message ? _context2.t0.response.data.message : _context2.t0.message
            });
            console.log(_context2.t0);

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 13]]);
  };
};

exports.register = register;

var getUserDetails = function getUserDetails(id) {
  return function _callee3(dispatch, getState) {
    var _getState, userInfo, config, _ref3, data;

    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            dispatch({
              type: _userConstant.USER_DETAILS_REQUEST
            });
            _getState = getState(), userInfo = _getState.userLogin.userInfo;
            config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ".concat(userInfo.token)
              }
            };
            _context3.next = 6;
            return regeneratorRuntime.awrap(_axios["default"].get("/api/users/".concat(id), config));

          case 6:
            _ref3 = _context3.sent;
            data = _ref3.data;
            dispatch({
              type: _userConstant.USER_DETAILS_SUCCESS,
              payload: data
            });
            console.log(data);
            _context3.next = 16;
            break;

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](0);
            dispatch({
              type: _userConstant.USER_DETAILS_FAIL,
              payload: _context3.t0.response && _context3.t0.response.data.message ? _context3.t0.response.data.message : _context3.t0.message
            });
            console.log(_context3.t0);

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, null, null, [[0, 12]]);
  };
};

exports.getUserDetails = getUserDetails;

var updateUserProfile = function updateUserProfile(user) {
  return function _callee4(dispatch, getState) {
    var _getState2, userInfo, config, _ref4, data;

    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            dispatch({
              type: _userConstant.USER_UPDATE_PROFILE_REQUEST
            });
            _getState2 = getState(), userInfo = _getState2.userLogin.userInfo;
            config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ".concat(userInfo.token)
              }
            };
            _context4.next = 6;
            return regeneratorRuntime.awrap(_axios["default"].put("api/users/profile", user, config));

          case 6:
            _ref4 = _context4.sent;
            data = _ref4.data;
            dispatch({
              type: _userConstant.USER_UPDATE_PROFILE_SUCCESS,
              payload: data
            });
            dispatch({
              type: _userConstant.USER_LOGIN_SUCCESS,
              payload: data
            });
            console.log(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            _context4.next = 18;
            break;

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](0);
            dispatch({
              type: _userConstant.USER_UPDATE_PROFILE_FAIL,
              payload: _context4.t0.response && _context4.t0.response.data.message ? _context4.t0.response.data.message : _context4.t0.message
            });
            console.log(_context4.t0);

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, null, null, [[0, 14]]);
  };
};

exports.updateUserProfile = updateUserProfile;

var listUsers = function listUsers() {
  return function _callee5(dispatch, getState) {
    var _getState3, userInfo, config, _ref5, data;

    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            dispatch({
              type: _userConstant.USER_LIST_REQUEST
            });
            _getState3 = getState(), userInfo = _getState3.userLogin.userInfo;
            config = {
              headers: {
                Authorization: "Bearer ".concat(userInfo.token)
              }
            };
            _context5.next = 6;
            return regeneratorRuntime.awrap(_axios["default"].get("/api/users/", config));

          case 6:
            _ref5 = _context5.sent;
            data = _ref5.data;
            dispatch({
              type: _userConstant.USER_LIST_SUCCESS,
              payload: data
            });
            _context5.next = 15;
            break;

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](0);
            dispatch({
              type: _userConstant.USER_LIST_FAIL,
              payload: _context5.t0.response && _context5.t0.response.data.message ? _context5.t0.response.data.message : _context5.t0.message
            });
            console.log(_context5.t0);

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[0, 11]]);
  };
};

exports.listUsers = listUsers;

var deleteUser = function deleteUser(id) {
  return function _callee6(dispatch, getState) {
    var _getState4, userInfo, config, _ref6, data;

    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            dispatch({
              type: _userConstant.USER_DELETE_REQUEST
            });
            _getState4 = getState(), userInfo = _getState4.userLogin.userInfo;
            config = {
              headers: {
                Authorization: "Bearer ".concat(userInfo.token)
              }
            };
            _context6.next = 6;
            return regeneratorRuntime.awrap(_axios["default"]["delete"]("/api/users/".concat(id), config));

          case 6:
            _ref6 = _context6.sent;
            data = _ref6.data;
            dispatch({
              type: _userConstant.USER_DELETE_SUCCESS
            });
            _context6.next = 15;
            break;

          case 11:
            _context6.prev = 11;
            _context6.t0 = _context6["catch"](0);
            dispatch({
              type: _userConstant.USER_DELETE_FAIL,
              payload: _context6.t0.response && _context6.t0.response.data.message ? _context6.t0.response.data.message : _context6.t0.message
            });
            console.log(_context6.t0);

          case 15:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[0, 11]]);
  };
};

exports.deleteUser = deleteUser;

var updateUser = function updateUser(user) {
  return function _callee7(dispatch, getState) {
    var _getState5, userInfo, config, _ref7, data;

    return regeneratorRuntime.async(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            console.log(user);
            _context7.prev = 1;
            dispatch({
              type: _userConstant.USER_UPDATE_REQUEST
            });
            _getState5 = getState(), userInfo = _getState5.userLogin.userInfo;
            config = {
              headers: {
                "Content-Type": 'application/json',
                Authorization: "Bearer ".concat(userInfo.token)
              }
            };
            _context7.next = 7;
            return regeneratorRuntime.awrap(_axios["default"].put("/api/users/".concat(user._id), user, config));

          case 7:
            _ref7 = _context7.sent;
            data = _ref7.data;
            dispatch({
              type: _userConstant.USER_UPDATE_SUCCESS
            });
            dispatch({
              type: _userConstant.USER_DETAILS_SUCCESS,
              payload: data
            });
            _context7.next = 17;
            break;

          case 13:
            _context7.prev = 13;
            _context7.t0 = _context7["catch"](1);
            dispatch({
              type: _userConstant.USER_UPDATE_FAIL,
              payload: _context7.t0.response && _context7.t0.response.data.message ? _context7.t0.response.data.message : _context7.t0.message
            });
            console.log(_context7.t0);

          case 17:
          case "end":
            return _context7.stop();
        }
      }
    }, null, null, [[1, 13]]);
  };
};

exports.updateUser = updateUser;