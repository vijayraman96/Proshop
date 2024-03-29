import React, {useState, useEffect} from 'react';
import {Form, Row, Col, Button, Table} from 'react-bootstrap'
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import Loader from '../components/Loader';
import {listMyOrders} from '../actions/orderActions'

const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userDetails);
    
    const {loading, error, user} = userDetails;
    const userLogin = useSelector(state => state.userLogin);
    
    const {userInfo} = userLogin;
    console.log(error, loading, userInfo);

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const {success} = userUpdateProfile;

    const orderListMy = useSelector(state => state.orderListMy)
    const {loading: loadingOrders, error: errorOrders, orders} = orderListMy;
  
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()
    const navigateHandeler = (val) => {
        navigate(val)
      }
    console.log(userInfo)
    console.log(user)
    useEffect(() => {
        if(!userInfo) {
            navigate('/login')
        } else {
            if(!user || !user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                console.log('user name', user.name)
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [userInfo, dispatch, user])
    console.log(userInfo)
   
    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({
                id: user._id,
                name, 
                email,
                password
            }))
        }
    };

    return (
       <Row>
        <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" placeholder="Enter the name" value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter the email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter the password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Button className="my-3" type="Submit" variant="primary">Update</Button>
        </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? <Loader /> : errorOrders ? <Message variant="dangers">{errorOrders}</Message>: (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIEVERD</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                 <td>{order._id}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10): (<i className="fas fa-times" style={{color: 'red'}}></i>)}</td>
                                <td>{order.isDelivered ? order.isDelivered.substring(0, 10): (<i className="fas fa-times" style={{color: 'red'}}></i>)}</td>
                                <td>
                                    <div onClick={() => {navigateHandeler(`/product/${order._id}/`)}}>
                                        <Button variant="light">Details</Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Col>
       </Row>
    )
}

export default ProfileScreen;
