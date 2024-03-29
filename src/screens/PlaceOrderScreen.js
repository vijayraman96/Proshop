import React, {useState, useEffect} from 'react';
import {Row, Col, Button, ListGroup, Image, Card, ListGroupItem} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate, Navigate } from 'react-router-dom';
import Message from '../components/Message';
import CheckOut from '../components/CheckOut';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = () => {
    const cart = useSelector(state => state.cart);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    console.log(cart);
    const addDecimals = (num) => {
      return (Math.round(num * 100)/100).toFixed(2)
    }
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 10)
    cart.taxPrice = addDecimals(Number(cart.itemsPrice * 0.15).toFixed(2))
    cart.totalPrice = addDecimals(Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice))
    console.log(cart.totalPrice);
    const orderCreate = useSelector(state => state.orderCreate);
    const {order, success, error} = orderCreate;
    const PlaceOrderHandler = () => {
      console.log('order Create', orderCreate)
      dispatch(createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }))
    }
    console.log('success', success)
    useEffect(() => {
      if(success) {
        navigate(`/order/${order._id}`)
      }
    }, [success])
  return (
    <>
      <CheckOut step1 step2 step3 step4/>
      <Row>
        <Col md={8}>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Address: </strong>
                        {cart.shippingAddress.country}, {cart.shippingAddress.address},
                        {cart.shippingAddress.city},
                        {cart.shippingAddress.postalCode}
                    </p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment method</h2>
                    <p>
                        <strong>Method: </strong>
                        {cart.paymentMethod}
                    </p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {
                      cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                        <ListGroup variant="flush">
                          {cart.cartItems.map((item, index) => (
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
                        {cart.paymentMethod}
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
                  <Col>${cart.itemsPrice}</Col>
                </Row>
             </ListGroup.Item>
             <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
             </ListGroup.Item>
             <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
             </ListGroup.Item>
             <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
             </ListGroup.Item>
             <ListGroup.Item>
              {error && <Message variant="danger">{error}</Message>}
             </ListGroup.Item>
             <ListGroup.Item>
              <Button type="button" className="btn-block" disabled={cart.cartItems === 0} onClick={PlaceOrderHandler}>PlaceOrder</Button>
             </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
