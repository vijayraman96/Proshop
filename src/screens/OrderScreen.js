import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Row, Col, Button, ListGroup, Image, Card, ListGroupItem} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate, Navigate, useParams } from 'react-router-dom';
import Message from '../components/Message';
// import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import { getOrderDetails, payOrder, razorCreateOrder } from '../actions/orderActions';
import Loader from '../components/Loader';
import { ORDER_PAY_RESET } from '../constants/orderConstant';
import useRazorpay from "react-razorpay";

const OrderScreen = () => {
  const [sdkReady, setSdkReady] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const orderId = useParams();
    const Razorpay = useRazorpay();
    const orderDetails = useSelector(state => state.orderDetails);
    const {order, loading, error} = orderDetails;
    const orderPay = useSelector(state => state.orderPay);
    const {loading:loadingPay, success:successPay} = orderPay;
   
    if(!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100)/100).toFixed(2)
          }
        order.itemsPrice= addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
        order.taxPrice = addDecimals(Number(order.itemsPrice * 0.15).toFixed(2))
    }
    const handlePayment = async (params) => {
      console.log(order.totalPrice)
      // console.log('order - 1', order.totalPrice
      const {data} = await axios.post(`/api/pay/`, {totalPrice: order.totalPrice.toFixed(0)})
      console.log('data', data)
      const options = {
        key: "rzp_test_Jdt9NgdMu13r97", // Enter the Key ID generated from the Dashboard
        amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "x corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
        handler: function (response) {
          console.log('response', response)
          const values  = {
            payId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature
          }
          console.log(values); 
          let createDate = new Date();
          let day = createDate.getDate();
          let month = createDate.getMonth() + 1;
          let year = createDate.getFullYear();
          let min  = createDate.getMinutes();
          let sec = createDate.getMinutes();
          let time = `${day}-${month}-${year} ${min}-${sec}`;
          console.log(time)
          const paymentResult = {
            id: response.razorpay_payment_id,
            status: true,
            update_time: time,
            email_address: "vijayadaran@gmail.com"
          }
          console.log('payment-result', paymentResult)
          dispatch(payOrder(orderId, paymentResult))
        },
        prefill: {
          name: "vijay",
          email: "vijayadaran@gmail.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
    
      const rzp1 = new Razorpay(options);
    
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
    
      rzp1.open();
    }
    // console.log("order", order && order.paymentMethod)
    // console.log('itemsprice', itemsPrice)
    useEffect(() => {
      // const addPayPalScript = async () => {
      //   const {data: clientId} = await axios.get('/api/config/paypal');
        // const script = document.createElement('script');
        // script.type="text/javascript"
        // script.src= "https://checkout.razorpay.com/v1/checkout.js"
        // script.async = true
        // script.onload = () => {
        //   // setSdkReady(true)
        // }
        // document.body.appendChild(script)
      // }
      if(!order || successPay) {
        dispatch({type: ORDER_PAY_RESET})
        dispatch(getOrderDetails(orderId.id))
      } else if(!order.isPaid) {
        if(!window.paypal) {
          // addPayPalScript()
        } else {
          setSdkReady(true)
        }
      }
    }, [dispatch, orderId, successPay, order])
    // const successPaymentHandler = (paymentResult) => {
    //   console.log(paymentResult)
    //   dispatch(payOrder(orderId, paymentResult))
    // }

  return loading ? <Loader></Loader> : error ? <Message variant="danger">{error}</Message> : (
    <>
        <h1>Order {order._id}</h1>
        <Row>
        <Col md={8}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <strong>Name:</strong> {order.user.name}
                    <a className="ms-2" href={`mailto: ${order.user.email}`} >{order.user.email}</a>
                    <p>
                        <strong>Address: </strong>
                        {order.shippingAddress.country}, {order.shippingAddress.address},
                        {order.shippingAddress.city},
                        {order.shippingAddress.postalCode}
                    </p>
                    {order.isDelivered ? <Message variant='success'>Delivered at {order.deliveredAt}</Message>: (<Message variant="danger">Not delivered</Message>)}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment method</h2>
                    <p>
                        <strong>Method: </strong>
                        {order.paymentMethod}
                    </p>
                    {order.isPaid ? <Message variant='success'>Paid at {order.paymentResult.update_time}</Message>: (<Message variant="danger">Not Paid</Message>)}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {
                      order.orderItems.length === 0 ? <Message>Your cart is empty</Message> : (
                        <ListGroup variant="flush">
                          {order.orderItems.map((item, index) => (
                            <ListGroup.Item key={index}>
                              <Row>
                                <Col md={1}>
                                  <Image src={item.image} alt={item.name} fluid rounded/>
                                </Col>
                                <Col>
                                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col md={4}>
                                {item.qty} x ${item.price} = ${item.qty * item.price}
                                </Col>
                              </Row>
                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      )
                    }
                    <p>
                        <strong>Method: </strong>
                        {order.paymentMethod}
                    </p>
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
             <ListGroup.Item>
              <h2>Order Summary</h2>
             </ListGroup.Item>
             <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
             </ListGroup.Item>
             <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
             </ListGroup.Item>
             <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
             </ListGroup.Item>
             <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
             </ListGroup.Item>
             {!order.isPaid && (
              <ListGroup.Item>
                {loadingPay && <Loader />}
                {sdkReady ? <Loader /> : (
                  <Button onClick={handlePayment}>Pay</Button>
                )} 
              </ListGroup.Item>
             )}
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
