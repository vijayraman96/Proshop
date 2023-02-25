"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactBootstrap = require("react-bootstrap");

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _Message = _interopRequireDefault(require("../components/Message"));

var _orderActions = require("../actions/orderActions");

var _Loader = _interopRequireDefault(require("../components/Loader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import Loader from '../components/Loader';
var OrderScreen = function OrderScreen() {
  var navigate = (0, _reactRouterDom.useNavigate)();
  var dispatch = (0, _reactRedux.useDispatch)();
  var orderId = (0, _reactRouterDom.useParams)();
  var orderDetails = (0, _reactRedux.useSelector)(function (state) {
    return state.orderDetails;
  });
  var order = orderDetails.order,
      loading = orderDetails.loading,
      error = orderDetails.error;
  console.log(orderId.id);
  (0, _react.useEffect)(function () {
    dispatch((0, _orderActions.getOrderDetails)(orderId));
  }, []); //   return loading ? <Loader></Loader> : error ? <Message variant="danger">{error}</Message> : (
  //     <>
  //         <h1>Order {order._id}</h1>
  //         <Row>
  //         <Col md={8}>
  //             <ListGroup variant="flush">
  //                 <ListGroup.Item>
  //                     <h2>Shipping</h2>
  //                     <p>
  //                         <strong>Address: </strong>
  //                         {order.shippingAddress.country}, {order.shippingAddress.address},
  //                         {order.shippingAddress.city},
  //                         {order.shippingAddress.postalCode}
  //                     </p>
  //                 </ListGroup.Item>
  //                 <ListGroup.Item>
  //                     <h2>Payment method</h2>
  //                     <p>
  //                         <strong>Method: </strong>
  //                         {order.paymentMethod}
  //                     </p>
  //                 </ListGroup.Item>
  //                 <ListGroup.Item>
  //                     <h2>Order Items</h2>
  //                     {
  //                       order.orderItems.length === 0 ? <Message>Your cart is empty</Message> : (
  //                         <ListGroup variant="flush">
  //                           {order.orderItems.map((item, index) => (
  //                             <ListGroup.Item key={index}>
  //                               <Row>
  //                                 <Col md={1}>
  //                                   <Image src={item.image} alt={item.name} fluid rounded/>
  //                                 </Col>
  //                                 <Col>
  //                                   <Link to={`/product/${item.product}`}>{item.name}</Link>
  //                                 </Col>
  //                                 <Col md={4}>
  //                                 {item.qty} x ${item.price} = ${item.qty * item.price}
  //                                 </Col>
  //                               </Row>
  //                             </ListGroup.Item>
  //                           ))}
  //                         </ListGroup>
  //                       )
  //                     }
  //                     <p>
  //                         <strong>Method: </strong>
  //                         {order.paymentMethod}
  //                     </p>
  //                 </ListGroup.Item>
  //             </ListGroup>
  //         </Col>
  //         <Col md={4}>
  //           <ListGroup variant="flush">
  //              <ListGroup.Item>
  //               <h2>Order Summary</h2>
  //              </ListGroup.Item>
  //              <ListGroup.Item>
  //                 <Row>
  //                   <Col>Items</Col>
  //                   <Col>${order.itemsPrice}</Col>
  //                 </Row>
  //              </ListGroup.Item>
  //              <ListGroup.Item>
  //                 <Row>
  //                   <Col>Shipping</Col>
  //                   <Col>${order.shippingPrice}</Col>
  //                 </Row>
  //              </ListGroup.Item>
  //              <ListGroup.Item>
  //                 <Row>
  //                   <Col>Tax</Col>
  //                   <Col>${order.taxPrice}</Col>
  //                 </Row>
  //              </ListGroup.Item>
  //              <ListGroup.Item>
  //                 <Row>
  //                   <Col>Total</Col>
  //                   <Col>${order.totalPrice}</Col>
  //                 </Row>
  //              </ListGroup.Item>
  //           </ListGroup>
  //         </Col>
  //       </Row>
  //     </>
  //   )
};

var _default = OrderScreen;
exports["default"] = _default;