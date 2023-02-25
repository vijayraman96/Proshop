import React, { useState, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  FormControl,
  FormCheck,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate, Navigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { savePaymentMethod } from "../actions/cartActions";
import CheckOut from "../components/CheckOut";
const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (!shippingAddress) {
    navigate("/shipping");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submit");
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <FormContainer>
      <CheckOut step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col className="mb-3">
            <FormCheck 
                type="radio"
                label="Paypal or Credit Card"
                id="Paypal"
                name="paymentMethod"
                value="Paypal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
            ></FormCheck>
            <FormCheck
                type="radio"
                label="Stripe"
                id="Stripe"
                name="paymentMethod"
                value="Stripe"
                onChange={(e) => setPaymentMethod(e.target.value)}
            ></FormCheck>
            </Col>
        </Form.Group>
        
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
