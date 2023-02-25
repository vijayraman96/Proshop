import React, {useState, useEffect} from 'react';
import {Form, Row, Col, Button, FormControl} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate, Navigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions';
import CheckOut from '../components/CheckOut';
const ShippingScreen = () => {
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart
    const [address, setAddress ] = useState(shippingAddress.address)
    const [city, setCity ] = useState(shippingAddress.city)
    const [postalCode, setPostalCode ] = useState(shippingAddress.postalCode)
    const [country, setCountry ] = useState(shippingAddress.country)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        console.log('submit')
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        navigate('/payment')
    }
  return (
    <FormContainer>
        <CheckOut step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <FormControl
                type="text"
                placeholder="Enter the address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}>
                </FormControl>
            </Form.Group>
            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <FormControl
                    type="text"
                    placeholder="Enter the city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}>
                </FormControl>
            </Form.Group>
            <Form.Group controlId='postalCode'>
                <Form.Label>Postal Code</Form.Label>
                <FormControl
                    type="text"
                    placeholder="Enter the Postal Code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}>
                </FormControl>
            </Form.Group>
            <Form.Group controlId='country'>
                <Form.Label>Name</Form.Label>
                <FormControl
                type="text"
                placeholder="Enter the country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}>
                </FormControl>
            </Form.Group>
            <Button type="submit" variant="primary">Continue</Button>
        </Form>
    </FormContainer>
  )
}

export default ShippingScreen
